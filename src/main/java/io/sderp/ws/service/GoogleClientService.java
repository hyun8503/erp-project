package io.sderp.ws.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import io.sderp.ws.configuration.support.GoogleProperties;
import io.sderp.ws.model.Report;
import io.sderp.ws.model.Template;
import io.sderp.ws.model.UserActionHistories;
import io.sderp.ws.model.support.UserActionHistoryStatus;
import io.sderp.ws.model.support.UserActionHistoryType;
import io.sderp.ws.repository.ReportRepository;
import io.sderp.ws.repository.TemplateRepository;
import io.sderp.ws.repository.UserActionHistoryRepository;
import io.sderp.ws.util.GoogleApiUtil;
import io.sderp.ws.util.S3Util;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.file.Files;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class GoogleClientService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleClientService.class);

    private static String TEMP_DOWNLOAD_PATH;
    private TemplateRepository templateRepository;
    private UserActionHistoryRepository userActionHistoryRepository;
    private ReportRepository reportRepository;

    @Autowired
    public GoogleClientService(TemplateRepository templateRepository, UserActionHistoryRepository userActionHistoryRepository, ReportRepository reportRepository, GoogleProperties googleProperties) {
        this.templateRepository = templateRepository;
        this.userActionHistoryRepository = userActionHistoryRepository;
        this.reportRepository = reportRepository;
        TEMP_DOWNLOAD_PATH = googleProperties.getTempDownloadPath();
        if(TEMP_DOWNLOAD_PATH == null) {
            throw new RuntimeException("check properties file");
        }
    }

    public String checkGoogleCredential(String token) throws IOException, GeneralSecurityException {
        return GoogleApiUtil.credentialCheck(token);
    }

    public Credential getCredentialProcStart(String token, String code) throws GeneralSecurityException, IOException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        return GoogleApiUtil.getCredentials(HTTP_TRANSPORT, token, code);
    }

    public void readDriveFileList(Drive service) throws IOException {
        FileList result = service.files().list()
                .setPageSize(10)
                .setFields("nextPageToken, files(id, name)")
                .execute();
        List<File> files = result.getFiles();
        if (files == null || files.isEmpty()) {
            logger.trace("No files found.");
        } else {
            System.out.println("Files:");
            for (File file : files) {
                logger.trace("fileName = {}, fileId = {}", file.getName(), file.getId());
            }
        }
    }

    public File fileUpload(Template template, String token) throws IOException, GeneralSecurityException {
        Resource fileResource = S3Util.download(template.getFilePath());
        logger.trace("file resource = {}", fileResource);

        // delete duplicated files
        deleteFilesByFileName(template.getFileName(), token);
        
        File fileMeta = new File();
        fileMeta.setName(template.getFileName());
        fileMeta.setMimeType("application/vnd.google-apps.spreadsheet");
        InputStreamContent inputStreamContent = new InputStreamContent("application/vnd.google-apps.spreadsheet", fileResource.getInputStream());
        File file = GoogleApiUtil.getDrive(token).files().create(fileMeta, inputStreamContent).setFields("id, name, webViewLink, mimeType").execute();
        logger.trace("file info {}, {}, {}, {}", file.getId(), file.getName(), file.getWebViewLink(), file.getMimeType());
        return file;
    }

    public File fileUpload(Report report, String token) throws IOException, GeneralSecurityException {
        Resource fileResource = S3Util.download(report.getFilePath());
        logger.trace("file resource = {}", fileResource);

        // delete duplicated files
        deleteFilesByFileName(report.getFileName(), token);
        
        File fileMeta = new File();
        fileMeta.setName(report.getFileName());
        fileMeta.setMimeType("application/vnd.google-apps.spreadsheet");
        InputStreamContent inputStreamContent = new InputStreamContent("application/vnd.google-apps.spreadsheet", fileResource.getInputStream());
        File file = GoogleApiUtil.getDrive(token).files().create(fileMeta, inputStreamContent).setFields("id, name, webViewLink, mimeType").execute();
        logger.trace("file info {}, {}, {}, {}", file.getId(), file.getName(), file.getWebViewLink(), file.getMimeType());
        return file;
    }

    @Transactional(rollbackFor = Exception.class)
    public void fileUpdate(String userId, String fileId, Template template, String paramJson, HttpServletRequest httpServletRequest, String token) throws Exception {
        try(FileOutputStream outputStream = new FileOutputStream( TEMP_DOWNLOAD_PATH+"/"+template.getFileName())) {
            GoogleApiUtil.getDrive(token).files().export(fileId, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").executeMediaAndDownloadTo(outputStream);
        }

        java.io.File inFile = new java.io.File(TEMP_DOWNLOAD_PATH+"/"+template.getFileName());
        FileItem fileItem = new DiskFileItem("file", Files.probeContentType(inFile.toPath()), false, inFile.getName(), (int) inFile.length(), inFile.getParentFile());

        try {
            InputStream input = new FileInputStream(inFile);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid file: " + e, e);
        }

        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
        template.setFileSize((float) multipartFile.getSize());
        template.setModifiedDate(LocalDateTime.now());
        templateRepository.updateTemplate(template);

        userActionHistoryRepository.insertActionHistory(UserActionHistories.builder()
                .description(paramJson)
                .ipAddress(httpServletRequest.getRemoteAddr())
                .statusCode(UserActionHistoryStatus.UPDATE)
                .typeCode(UserActionHistoryType.TEMPLATE)
                .userId(userId)
                .build());

        S3Util.upload(template.getFilePath(), multipartFile);
    }

    @Transactional(rollbackFor = Exception.class)
    public void fileUpdate(String userId, String fileId, Report report, HttpServletRequest httpServletRequest, String token) throws Exception {
        try(FileOutputStream outputStream = new FileOutputStream( TEMP_DOWNLOAD_PATH+"/"+report.getFileName())) {
            GoogleApiUtil.getDrive(token).files().export(fileId, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").executeMediaAndDownloadTo(outputStream);
        }

        java.io.File inFile = new java.io.File(TEMP_DOWNLOAD_PATH+"/"+report.getFileName());
        FileItem fileItem = new DiskFileItem("file", Files.probeContentType(inFile.toPath()), false, inFile.getName(), (int) inFile.length(), inFile.getParentFile());

        try {
            InputStream input = new FileInputStream(inFile);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input, os);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid file: " + e, e);
        }

        MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
        report.setFileSize((float) multipartFile.getSize());
        report.setModifiedDate(LocalDateTime.now());

        reportRepository.insertReportHistory(userId, report.getReportId());
        reportRepository.updateReport(report);
        S3Util.upload(report.getFilePath(), multipartFile);
    }
    
    public void deleteFilesByFileName(String fileName, String token) {
    	String pageToken = null;
    	
    	do {
    		
    		FileList result;
			try {
				result = GoogleApiUtil.getDrive(token).files().list()
					.setQ("mimeType='application/vnd.google-apps.spreadsheet'")
					.setSpaces("drive")
					.setFields("nextPageToken, files(id, name)")
					.setPageToken(pageToken)
					.execute();
				
				List<File> files = result.getFiles();
				if (files != null) {
		    		for (File file : files) {
		    			String uploadedFileId = file.getId();
		    			String uploadedFileName = file.getName();
		    			
		    			if (uploadedFileName != null && uploadedFileName.equals(fileName) == true) {
		    				GoogleApiUtil.getDrive(token).files().delete(uploadedFileId).execute();
		    			}
		    		}
				}
	    		pageToken = result.getNextPageToken();
			} catch (Exception ex) {
				logger.trace(ex.getMessage());
			}
    	} while (pageToken != null);
    	
    }
}

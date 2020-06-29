package io.sderp.ws.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.sderp.ws.model.Report;
import io.sderp.ws.model.Template;
import io.sderp.ws.model.UserActionHistories;
import io.sderp.ws.model.support.UserActionHistoryStatus;
import io.sderp.ws.model.support.UserActionHistoryType;
import io.sderp.ws.repository.ReportRepository;
import io.sderp.ws.repository.TemplateRepository;
import io.sderp.ws.repository.UserActionHistoryRepository;
import io.sderp.ws.util.S3Util;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ReportService {
    private static final Logger logger = LoggerFactory.getLogger(ReportService.class);
    private static final String templateFilePathPrefix = "template";
    private TemplateRepository templateRepository;
    private UserActionHistoryRepository userActionHistoryRepository;
    private ReportRepository reportRepository;

    @Autowired
    public ReportService(TemplateRepository templateRepository, UserActionHistoryRepository userActionHistoryRepository, ReportRepository reportRepository) {
        this.templateRepository = templateRepository;
        this.userActionHistoryRepository = userActionHistoryRepository;
        this.reportRepository = reportRepository;
    }

    public List<Report> selectAllReport(String platformId, String reportName) {
        return reportRepository.selectAllReport(platformId, reportName);
    }

    public List<Report> selectReport(String userId, String reportMonth, String platformId, String reportName) {
        return reportRepository.selectReport(userId, reportMonth, platformId, reportName);
    }

    public Report selectReportByReportId(String reportId) {
        return reportRepository.selectReportByReportId(reportId);
    }

    public List<Template> selectAllTemplate() {
        return templateRepository.selectAllTemplate();
    }

    public Template getTemplate(String templateId) throws IOException {
        Template template = templateRepository.selectTemplate(templateId);
        if(template.getTemplateId() == null) {
            throw new RuntimeException("not exists template");
        }

        return template;
    }
    
    @Transactional(rollbackFor = Exception.class)
    public void deleteTemplate(String templateId) throws Exception {
    	Template template = templateRepository.selectTemplate(templateId);
    	if(template.getTemplateId() == null) {
    		throw new RuntimeException("not exists template");
    	}
    	
    	reportRepository.deleteReportByTemplateId(templateId);
    	templateRepository.deleteTemplate(templateId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertTemplate(List<MultipartFile> files, String userId, HttpServletRequest httpServletRequest) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = new HashMap<>();
        for (MultipartFile file: files) {
            String templateId = UUID.randomUUID().toString();
            String fileName = templateId + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            String filePath = getTemplateFilePath(templateId, fileName);

            map.put("templateId", templateId);
            map.put("fileName", fileName);
            map.put("filePath", filePath);

            Template template = Template.builder()
                    .templateId(templateId)
                    .templateName(file.getOriginalFilename())
                    .fileName(fileName)
                    .filePath(filePath)
                    .fileSize((float)file.getSize())
                    .createdDate(LocalDateTime.now())
                    .modifiedDate(LocalDateTime.now())
                    .build();
            templateRepository.insertTemplate(template);
            String fileKey = S3Util.upload(filePath, file);
            logger.trace("aws file key = {}", fileKey);
        }

        String paramJson = objectMapper.writeValueAsString(map);
        userActionHistoryRepository.insertActionHistory(UserActionHistories.builder()
                .description(paramJson)
                .ipAddress(httpServletRequest.getRemoteAddr())
                .statusCode(UserActionHistoryStatus.CREATE)
                .typeCode(UserActionHistoryType.TEMPLATE)
                .userId(userId)
                .build());
    }

    private String getTemplateFilePath(String templateId, String fileName) {
        return templateFilePathPrefix + "/" + templateId + "/" + fileName;
    }
}

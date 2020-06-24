package io.sderp.ws.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import io.sderp.ws.util.GoogleApiUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Service
public class GoogleClientService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleClientService.class);

    public GoogleClientService() {

    }

    public String checkGoogleCredential(String userId) throws IOException, GeneralSecurityException {
        return GoogleApiUtil.credentialCheck(userId);
    }

    public Credential getCredentialProcStart(String userId, String rendingURL) throws GeneralSecurityException, IOException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        return GoogleApiUtil.getCredentials(HTTP_TRANSPORT, userId, rendingURL);
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
}

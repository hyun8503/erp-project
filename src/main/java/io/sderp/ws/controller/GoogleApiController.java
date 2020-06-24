package io.sderp.ws.controller;

import com.google.api.client.auth.oauth2.Credential;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.GoogleClientService;
import io.sderp.ws.util.GoogleApiUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class GoogleApiController {
    private static final Logger logger = LoggerFactory.getLogger(GoogleApiController.class);

    private GoogleClientService googleClientService;
    private AuthenticationService authenticationService;

    @Autowired
    public GoogleApiController(GoogleClientService googleClientService, AuthenticationService authenticationService) {
        this.googleClientService = googleClientService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/gapi/test")
    public ResponseEntity<Object> test(HttpServletRequest httpRequest) throws IOException, GeneralSecurityException {
        googleClientService.readDriveFileList(GoogleApiUtil.getDrive(authenticationService.getUser().getUserId()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/gapi/check-credential")
    public ResponseEntity<Object> checkCredential(HttpServletRequest httpRequest) throws IOException, GeneralSecurityException {
        String authUrl = googleClientService.checkGoogleCredential(authenticationService.getUser().getUserId());
        Map<String, String> map = new HashMap<>();
        map.put("authUrl", authUrl);
        map.put("redirectUri", GoogleApiUtil.LOCAL_RECEIVER_CALLBACK_URL);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/gapi/credential-proc-start")
    public ResponseEntity<Object> credentialProcStart(HttpServletRequest httpRequest, @RequestParam String rendingURL) throws IOException, GeneralSecurityException {
        Credential credential = googleClientService.getCredentialProcStart(authenticationService.getUser().getUserId(), rendingURL);
        logger.info("credential Success = {}", credential.getAccessToken());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

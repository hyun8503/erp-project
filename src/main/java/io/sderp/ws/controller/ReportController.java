package io.sderp.ws.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.services.drive.model.File;
import io.sderp.ws.controller.param.UpdateReportParam;
import io.sderp.ws.controller.param.UpdateTemplateParam;
import io.sderp.ws.model.Report;
import io.sderp.ws.model.Template;
import io.sderp.ws.model.support.UserType;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.GoogleClientService;
import io.sderp.ws.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ReportController {
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    private ReportService reportService;
    private AuthenticationService authenticationService;
    private GoogleClientService googleClientService;

    @Autowired
    public ReportController(ReportService reportService, AuthenticationService authenticationService, GoogleClientService googleClientService) {
        this.reportService = reportService;
        this.authenticationService = authenticationService;
        this.googleClientService = googleClientService;
    }

    @GetMapping("/report")
    public ResponseEntity<List<Report>> getReportAll(HttpServletRequest httpRequest,
                                                     @RequestParam(required = false) String platformId,
                                                     @RequestParam(required = false) String reportName,
                                                     @RequestParam(required = false) String reportMonth) {
        List<Report> reportList = new ArrayList<>();
        if(authenticationService.getUser().getTypeCode() == UserType.ADMIN) {
            reportList = reportService.selectAllReport(platformId, reportName);
        } else if(authenticationService.getUser().getTypeCode() == UserType.NORMAL) {
            reportList = reportService.selectReport(authenticationService.getUser().getUserId(), reportMonth, platformId, reportName);
        }

        return new ResponseEntity<>(reportList, HttpStatus.OK);
    }

    @GetMapping("/report/{reportId}/editviewlink")
    public ResponseEntity<Object> editViewReport(HttpServletRequest httpRequest, @RequestHeader(name="X-Auth-Token") String token, @PathVariable String reportId) throws IOException, GeneralSecurityException {
        Report report = reportService.selectReportByReportId(reportId);
        File file = googleClientService.fileUpload(report, authenticationService.getUser().getUserId());
        String webViewLink = file.getWebViewLink();
        
        Map<String, String> map = new HashMap<>();
        map.put("fileId", file.getId());
        map.put("webViewLink", webViewLink);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
    
    @GetMapping("/report/{reportId}/webviewlink")
    public ResponseEntity<Object> webViewReport(HttpServletRequest httpRequest, @RequestHeader(name="X-Auth-Token") String token,  @PathVariable String reportId) throws IOException, GeneralSecurityException {
    	Report report = reportService.selectReportByReportId(reportId);
    	File file = googleClientService.fileUpload(report, token);
    	String webViewLink = file.getWebViewLink();
    	
    	webViewLink = webViewLink.replace("/edit", "/htmlview");
    	
    	Map<String, String> map = new HashMap<>();
    	map.put("fileId", file.getId());
    	map.put("webViewLink", webViewLink);
    	return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/report/template")
    public ResponseEntity<List<Template>> getTemplates(HttpServletRequest httpRequest) {
        return new ResponseEntity<>(reportService.selectAllTemplate(), HttpStatus.OK);
    }

    @PostMapping("/report/template")
    public ResponseEntity<Object> uploadTemplate(HttpServletRequest httpRequest, @RequestPart List<MultipartFile> files) throws Exception {
        if(files.size() == 0) {
            throw new RuntimeException("report upload error: files empty");
        }

        reportService.insertTemplate(files, authenticationService.getUser().getUserId(), httpRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/report/template")
    public ResponseEntity<Object> updateTemplate(HttpServletRequest httpRequest, @RequestHeader(name="X-Auth-Token") String token, @RequestBody UpdateTemplateParam param) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String paramJson = objectMapper.writeValueAsString(param);

        Template template = reportService.getTemplate(param.getTemplateId());
        googleClientService.fileUpdate(authenticationService.getUser().getUserId(), param.getFileId(), template, paramJson, httpRequest, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/report")
    public ResponseEntity<Object> updateReport(HttpServletRequest httpRequest, @RequestHeader(name="X-Auth-Token") String token,  @RequestBody UpdateReportParam param) throws Exception {
        Report report = reportService.selectReportByReportId(param.getReportId());
        googleClientService.fileUpdate(authenticationService.getUser().getUserId(), param.getFileId(), report, httpRequest, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/report/template/{templateId}")
    public ResponseEntity<Object> viewTemplate(HttpServletRequest httpRequest, @RequestHeader(name="X-Auth-Token") String token, @PathVariable String templateId) throws IOException, GeneralSecurityException {
        Template template = reportService.getTemplate(templateId);
        File file = googleClientService.fileUpload(template, token);
        Map<String, String> map = new HashMap<>();
        map.put("fileId", file.getId());
        map.put("webViewLink", file.getWebViewLink());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}

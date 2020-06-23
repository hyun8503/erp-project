package io.sderp.ws.controller;

import io.sderp.ws.model.Template;
import io.sderp.ws.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReportController {
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
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

        reportService.insertTemplate(files);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package io.sderp.ws.service;

import io.sderp.ws.model.Template;
import io.sderp.ws.repository.TemplateRepository;
import io.sderp.ws.util.S3Util;
import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ReportService {
    private static final Logger logger = LoggerFactory.getLogger(ReportService.class);
    private static final String templateFilePathPrefix = "template";
    private TemplateRepository templateRepository;

    @Autowired
    public ReportService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public List<Template> selectAllTemplate() {
        return templateRepository.selectAllTemplate();
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertTemplate(List<MultipartFile> files) throws Exception {
        for (MultipartFile file: files) {
            String templateId = UUID.randomUUID().toString();
            String fileName = templateId + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            String filePath = getTemplateFilePath(templateId, fileName);
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
    }

    private String getTemplateFilePath(String templateId, String fileName) {
        return templateFilePathPrefix + "/" + templateId + "/" + fileName;
    }
}

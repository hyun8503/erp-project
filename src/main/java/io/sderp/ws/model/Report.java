package io.sderp.ws.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    private String reportId;
    private String reportName;

    private String reportMonth;

    private String platformId;

    private String templateId;

    private String fileName;

    private String filePath;

    private Float fileSize;

    private String platformName;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
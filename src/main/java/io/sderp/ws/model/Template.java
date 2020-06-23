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
public class Template {
    private String templateId;

    private String templateName;

    private String fileName;

    private String filePath;

    private Float fileSize;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;
}
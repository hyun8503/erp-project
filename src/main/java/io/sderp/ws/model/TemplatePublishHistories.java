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
public class TemplatePublishHistories {
    private Long publishHistId;

    private String templateId;

    private String platformId;

    private String reportMonth;

    private String successFlag;

    private LocalDateTime createdDate;

    private String description;
}
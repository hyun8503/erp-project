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
public class UserActionHistories {
    private Long actionHistId;

    private String userId;

    private String typeCode;

    private String statusCode;

    private String ipAddress;

    private LocalDateTime createdDate;

    private String description;
}
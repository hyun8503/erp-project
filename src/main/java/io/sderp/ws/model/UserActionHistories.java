package io.sderp.ws.model;

import io.sderp.ws.model.support.UserActionHistoryStatus;
import io.sderp.ws.model.support.UserActionHistoryType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserActionHistories {
    private BigInteger actionHistId;
    private String userId;
    private UserActionHistoryType typeCode;
    private UserActionHistoryStatus statusCode;
    private String ipAddress;
    private LocalDateTime createdDate;
    private String description;
}
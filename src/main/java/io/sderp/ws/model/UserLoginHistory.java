package io.sderp.ws.model;

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
public class UserLoginHistory {
    private BigInteger loginHistId;
    private String userId;
    private String os;
    private String browser;
    private String ipAddress;
    private LocalDateTime createdDate;
}
package io.sderp.ws.model;

import io.sderp.ws.model.support.UserStatusType;
import io.sderp.ws.model.support.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String userId;
    private String loginId;
    private String loginPassword;
    private UserType typeCode;
    private UserStatusType statusCode;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}

package io.sderp.ws.model;

import io.sderp.ws.model.support.UserStatusType;
import io.sderp.ws.model.support.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimpleUser implements Serializable {
    public static final long serialVersionUID = 1L;

    private String userId;
    private String loginId;
    private UserType typeCode;
    private UserStatusType statusCode;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}

package io.sderp.ws.model;

import io.sderp.ws.model.support.PermissionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    private String permissionId;
    private PermissionType permissionName;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
}

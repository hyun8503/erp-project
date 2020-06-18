package io.sderp.ws.controller.param;

import io.sderp.ws.model.support.PermissionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddRoleParam {
    private String roleName;
    private List<PermissionType> permissionList;
}

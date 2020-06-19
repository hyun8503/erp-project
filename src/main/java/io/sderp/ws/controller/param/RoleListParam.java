package io.sderp.ws.controller.param;

import io.sderp.ws.model.Permission;
import io.sderp.ws.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleListParam {
    private Role role;
    private List<Permission> permissionList;
}

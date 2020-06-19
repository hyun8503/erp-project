package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Role;
import io.sderp.ws.model.RoleWithPermission;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleMapper {
    List<Role> selectAllRole();
    Role selectRole(String roleId);
    List<RoleWithPermission> selectRoleWithPermission();
    long selectRoleNameCount(String roleName);
    int insertRole(Role role);
}

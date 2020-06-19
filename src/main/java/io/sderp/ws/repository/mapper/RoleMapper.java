package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Role;
import io.sderp.ws.model.RoleWithPermission;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleMapper {
    List<Role> selectAllRole();
    List<Role> selectRoleByName(String name);
    Role selectRole(String roleId);
    List<RoleWithPermission> selectRoleWithPermission();
    long selectRoleNameCount(String roleName);
    int insertRole(Role role);
    int updateRole(Role role);
    int deleteRole(String roleId);
}

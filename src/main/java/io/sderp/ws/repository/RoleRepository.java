package io.sderp.ws.repository;

import io.sderp.ws.model.Role;
import io.sderp.ws.model.RoleWithPermission;
import io.sderp.ws.repository.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoleRepository {
    private RoleMapper mapper;

    @Autowired
    public RoleRepository(RoleMapper mapper) {
        this.mapper = mapper;
    }

    public int insertRole(Role role) {
        return mapper.insertRole(role);
    }
    public int updateRole(Role role) { return mapper.updateRole(role); }
    public int deleteRole(String roleId) { return mapper.deleteRole(roleId); }

    public Role selectRole(String roleId) { return mapper.selectRole(roleId); }
    public List<Role> selectAllRole() { return mapper.selectAllRole(); }
    public long selectRoleNameCount(String roleName) {
        return mapper.selectRoleNameCount(roleName);
    }
    public List<RoleWithPermission> selectRoleWithPermission() {
        return mapper.selectRoleWithPermission();
    }
}

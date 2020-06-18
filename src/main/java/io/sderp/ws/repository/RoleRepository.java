package io.sderp.ws.repository;

import io.sderp.ws.model.Role;
import io.sderp.ws.repository.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

    public long selectRoleNameCount(String roleName) {
        return mapper.selectRoleNameCount(roleName);
    }
}

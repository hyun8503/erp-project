package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Role;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleMapper {
    long selectRoleNameCount(String roleName);
    int insertRole(Role role);
}

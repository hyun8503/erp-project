package io.sderp.ws.repository;

import io.sderp.ws.model.support.PermissionType;
import io.sderp.ws.repository.mapper.RolePermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public class RolePermissionRepository {
    private RolePermissionMapper mapper;

    @Autowired
    public RolePermissionRepository(RolePermissionMapper mapper) {
        this.mapper = mapper;
    }

    public void insertRolePermission(String roleId, PermissionType type) {
        mapper.insertRolePermission(roleId, type, LocalDateTime.now());
    }

    public int deleteRolePermission(String roleId) {
        return mapper.deleteRolePermission(roleId);
    }
}

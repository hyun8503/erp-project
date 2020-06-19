package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Permission;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionMapper {
    Permission selectPermission(String id);
    List<Permission> selectAllPermission();
    List<Permission> selectPermissionByRole(String roleId);

    int insertPermission(Permission permission);
}

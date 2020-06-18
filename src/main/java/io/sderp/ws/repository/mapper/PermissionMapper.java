package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Permission;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionMapper {
    List<Permission> selectAllPermission();

    int insertPermission(Permission permission);
}

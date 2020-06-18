package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.support.PermissionType;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface RolePermissionMapper {
    int insertRolePermission(@Param("roleId") String roleId, @Param("name") PermissionType name, @Param("now") LocalDateTime now);
}

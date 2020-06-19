package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.support.PermissionType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface RolePermissionMapper {
    int insertRolePermission(@Param("roleId") String roleId, @Param("name") PermissionType name, @Param("now") LocalDateTime now);
    int deleteRolePermission(String roleId);
}

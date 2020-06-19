package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.UserRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface UserRoleMapper {
    int deleteByPrimaryKey(@Param("userId") String userId, @Param("roleId") String roleId);

    int insert(UserRole record);

    List<UserRole> selectAll();

    int updateByPrimaryKey(UserRole record);

    long selectUserRoleCount(String roleId);
}
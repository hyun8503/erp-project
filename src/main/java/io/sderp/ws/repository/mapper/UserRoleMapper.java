package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.UserRole;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleMapper {
    int deleteByPrimaryKey(@Param("userId") String userId, @Param("roleId") String roleId);

    int insertUserRole(UserRole record);

    List<UserRole> selectAll();

    int updateByPrimaryKey(UserRole record);
    int updateUserRole(@Param("userId") String userId, @Param("roleId") String roleId);

    int deleteUserRole(String userId);

    long selectUserRoleCount(String roleId);
}
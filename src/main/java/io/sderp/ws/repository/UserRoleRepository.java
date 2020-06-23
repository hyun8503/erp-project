package io.sderp.ws.repository;

import io.sderp.ws.model.UserRole;
import io.sderp.ws.repository.mapper.UserRoleMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserRoleRepository {
    private UserRoleMapper mapper;

    public long selectUserRoleCount(String roleId) {
        return mapper.selectUserRoleCount(roleId);
    }

    public int insertUserRole(UserRole userRole) {
        return mapper.insertUserRole(userRole);
    }

    public UserRoleRepository(UserRoleMapper mapper) {
        this.mapper = mapper;
    }

    public int updateUserRole(String userId, String roleId) { return mapper.updateUserRole(userId, roleId); }
}

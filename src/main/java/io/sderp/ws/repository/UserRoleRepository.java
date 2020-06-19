package io.sderp.ws.repository;

import io.sderp.ws.repository.mapper.UserRoleMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserRoleRepository {
    private UserRoleMapper mapper;

    public UserRoleRepository(UserRoleMapper mapper) {
        this.mapper = mapper;
    }

    public long selectUserRoleCount(String roleId) {
        return mapper.selectUserRoleCount(roleId);
    }
}

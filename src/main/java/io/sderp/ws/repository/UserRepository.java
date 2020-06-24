package io.sderp.ws.repository;

import io.sderp.ws.model.User;
import io.sderp.ws.model.support.UserStatusType;
import io.sderp.ws.model.support.UserType;
import io.sderp.ws.repository.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private UserMapper mapper;

    @Autowired
    public UserRepository(UserMapper mapper) {
        this.mapper = mapper;
    }

    public User selectUser(String id) {
        return mapper.selectUser(id, UserStatusType.NORMAL);
    }
    public long selectUserCount(String id) {
        return mapper.selectUserCount(id, UserStatusType.NORMAL);
    }

    public List<User> selectUsers(UserType type) {
        return mapper.selectUsersWhereType(type);
    }
    public List<User> selectAllUser() { return mapper.selectAllUser(UserStatusType.NORMAL); }
    public User selectUserByUserId(String userId) { return mapper.selectUserByUserId(userId); }

    public int insertUser(User user) { return mapper.insertUser(user); }
    public int updateUser(User user) { return mapper.updateUser(user); }

    public int updatePassword(User user) { return mapper.updatePassword(user); }

    public List<User> searchUserList(String platform, String role, String name) {
        return mapper.searchUserList(platform, role, name);
    }
}

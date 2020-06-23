package io.sderp.ws.repository;

import io.sderp.ws.model.User;
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
        return mapper.selectUser(id);
    }
    public long selectUserCount(String id) { return mapper.selectUserCount(id); }

    public List<User> selectUsers(UserType type) {
        return mapper.selectUsersWhereType(type);
    }
    public List<User> selectAllUser() { return mapper.selectAllUser(); }
    public User selectUserByUserId(String userId) { return mapper.selectUserByUserId(userId); };

    public int insertUser(User user) {
        return mapper.insertUser(user);
    }
}

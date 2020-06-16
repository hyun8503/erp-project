package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.User;
import io.sderp.ws.model.support.UserType;

import java.util.List;

public interface UserMapper {
    User selectUser(String id);
    List<User> selectUsersWhereType(UserType type);
    int insertUser(User account);
}

package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.User;
import io.sderp.ws.model.support.UserType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    User selectUser(String id);
    long selectUserCount(String id);
    List<User> selectUsersWhereType(UserType type);
    List<User> selectAllUser();
    User selectUserByUserId(String userId);

    int insertUser(User account);
    int updateUser(User user);
}

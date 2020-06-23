package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.User;
import io.sderp.ws.model.support.UserStatusType;
import io.sderp.ws.model.support.UserType;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    User selectUser(@Param("id") String id, @Param("statusType") UserStatusType statusType);
    long selectUserCount(@Param("id") String id, @Param("statusType") UserStatusType statusType);
    List<User> selectUsersWhereType(UserType type);
    List<User> selectAllUser(UserStatusType userStatusType);
    User selectUserByUserId(String userId);

    int insertUser(User account);
    int updateUser(User user);
}

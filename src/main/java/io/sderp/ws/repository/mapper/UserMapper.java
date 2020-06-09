package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.BaseUser;
import io.sderp.ws.model.support.BaseUserType;

import java.util.List;

public interface UserMapper {
    BaseUser selectUser(String id);
    List<BaseUser> selectUsersWhereType(BaseUserType type);
    int insertUser(BaseUser account);
}

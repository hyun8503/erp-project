package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.UserLoginHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLoginHistoryMapper {
    int insertUserLoginHistory(UserLoginHistory userLoginHistory);
}

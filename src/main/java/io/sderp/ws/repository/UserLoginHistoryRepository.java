package io.sderp.ws.repository;

import io.sderp.ws.model.UserLoginHistory;
import io.sderp.ws.repository.mapper.UserLoginHistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserLoginHistoryRepository {
    private UserLoginHistoryMapper mapper;

    @Autowired
    public UserLoginHistoryRepository(UserLoginHistoryMapper mapper) {
        this.mapper = mapper;
    }

    public int insertUserLoginHistory(UserLoginHistory userLoginHistory) {
        return mapper.insertUserLoginHistory(userLoginHistory);
    }
}

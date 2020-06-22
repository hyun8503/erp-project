package io.sderp.ws.repository;

import io.sderp.ws.model.UserActionHistories;
import io.sderp.ws.repository.mapper.UserActionHistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public class UserActionHistoryRepository {
    private UserActionHistoryMapper mapper;

    @Autowired
    public UserActionHistoryRepository(UserActionHistoryMapper mapper) {
        this.mapper = mapper;
    }

    public int insertActionHistory(UserActionHistories userActionHistories, String remoteAddr, String paramJson) {
        userActionHistories.setIpAddress(remoteAddr);
        userActionHistories.setCreatedDate(LocalDateTime.now());
        userActionHistories.setDescription(paramJson);

        return mapper.insertActionHistory(userActionHistories);
    }
}

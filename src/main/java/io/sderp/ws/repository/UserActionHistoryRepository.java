package io.sderp.ws.repository;

import io.sderp.ws.model.UserActionHistories;
import io.sderp.ws.model.support.UserActionHistoryStatus;
import io.sderp.ws.model.support.UserActionHistoryType;
import io.sderp.ws.repository.mapper.UserActionHistoryMapper;
import io.sderp.ws.service.PlatformService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public class UserActionHistoryRepository {
    private static final Logger logger = LoggerFactory.getLogger(PlatformService.class);
    private UserActionHistoryMapper mapper;

    @Autowired
    public UserActionHistoryRepository(UserActionHistoryMapper mapper) {
        this.mapper = mapper;
    }

    public void insertActionHistory(UserActionHistories userActionHistories) {
        userActionHistories.setCreatedDate(LocalDateTime.now());
        logger.info("remoteAddr = {}", userActionHistories);
        mapper.insertActionHistory(userActionHistories);
    }

    public void updateActionHistory(UserActionHistories userActionHistories) {


        mapper.updateActionHistory(userActionHistories);
    }
}

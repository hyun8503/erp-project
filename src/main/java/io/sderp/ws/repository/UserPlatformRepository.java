package io.sderp.ws.repository;

import io.sderp.ws.model.UserPlatform;
import io.sderp.ws.repository.mapper.UserPlatformMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserPlatformRepository {
    private UserPlatformMapper mapper;

    @Autowired
    public UserPlatformRepository(UserPlatformMapper mapper) {
        this.mapper = mapper;
    }

    public int insertUserPlatform(UserPlatform record) {
        return mapper.insertUserPlatform(record);
    }
}

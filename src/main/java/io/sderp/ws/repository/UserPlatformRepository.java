package io.sderp.ws.repository;

import io.sderp.ws.model.Platform;
import io.sderp.ws.model.UserPlatform;
import io.sderp.ws.repository.mapper.UserPlatformMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserPlatformRepository {
    private UserPlatformMapper mapper;

    @Autowired
    public UserPlatformRepository(UserPlatformMapper mapper) {
        this.mapper = mapper;
    }

    public List<Platform> selectPlatformByUserId(String userId) { return mapper.selectPlatformByUserId(userId); }

    public int insertUserPlatform(UserPlatform record) {
        return mapper.insertUserPlatform(record);
    }

    public int deleteUserPlatform(String userId) { return mapper.deleteUserPlatform(userId); }
}

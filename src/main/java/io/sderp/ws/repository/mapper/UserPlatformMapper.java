package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Platform;
import io.sderp.ws.model.UserPlatform;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPlatformMapper {
    List<UserPlatform> selectAll();
    List<Platform> selectPlatformByUserId(String userId);

    int deleteByPrimaryKey(@Param("userId") String userId, @Param("platformId") String platformId);
    int insertUserPlatform(UserPlatform record);
    int updateByPrimaryKey(UserPlatform record);
    int deleteUserPlatform(String userId);
}
package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.UserPlatform;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPlatformMapper {
    int deleteByPrimaryKey(@Param("userId") String userId, @Param("platformId") String platformId);

    int insertUserPlatform(UserPlatform record);

    List<UserPlatform> selectAll();

    int updateByPrimaryKey(UserPlatform record);
}
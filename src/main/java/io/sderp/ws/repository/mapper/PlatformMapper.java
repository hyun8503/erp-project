package io.sderp.ws.repository.mapper;


import io.sderp.ws.model.Platform;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatformMapper {
    List<Platform> selectPlatformListByName(String platformName, String typeCode);
    List<Platform> selectPlatformList();
    void insertPlatform(Platform platform);
    long selectPlatformNameCount(String platformName);
    void updatePlatform(Platform platform);
    int deletePlatform(String platformId);
    long platformInUse(String platformId);
}

package io.sderp.ws.repository;

import io.sderp.ws.model.Platform;
import io.sderp.ws.model.support.PlatformType;
import io.sderp.ws.repository.mapper.PlatformMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlatformRepository {
    private PlatformMapper mapper;

    @Autowired
    public PlatformRepository(PlatformMapper mapper) {
        this.mapper = mapper;
    }

    public List<Platform> selectPlatformListByName(String platformName, String typeCode) { return mapper.selectPlatformListByName(platformName, typeCode); }
    public List<Platform> selectPlatformList() {
        return mapper.selectPlatformList();
    }

    public void insertPlatform(Platform platform) {
        mapper.insertPlatform(platform);
    }
    public long selectPlatformNameCount(String platformName) {
        return mapper.selectPlatformNameCount(platformName);
    }
    public void updatePlatform(Platform platform) { mapper.updatePlatform(platform); }
    public int deletePlatform(String platformId) {
        return mapper.deletePlatform(platformId);
    }

    public long platformInUse(String platformId) {
        return mapper.platformInUse(platformId);
    }
}

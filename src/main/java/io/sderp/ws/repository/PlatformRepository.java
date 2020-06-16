package io.sderp.ws.repository;

import io.sderp.ws.model.Platform;
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

    public List<Platform> selectPlatformList() {
        return mapper.selectPlatformList();
    }

    public void insertPlatform(Platform platform) {
        mapper.insertPlatform(platform);
    }
}

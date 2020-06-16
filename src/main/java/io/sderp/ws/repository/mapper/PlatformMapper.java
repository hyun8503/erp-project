package io.sderp.ws.repository.mapper;

import io.sderp.ws.model.Platform;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatformMapper {
    List<Platform> selectPlatformList();
    void insertPlatform(Platform platform);
}

package io.sderp.ws.service;

import io.sderp.ws.model.Platform;
import io.sderp.ws.repository.PlatformRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PlatformService {
    private static final Logger logger = LoggerFactory.getLogger(PlatformService.class);

    private PlatformRepository platformRepository;

    @Autowired
    public PlatformService (PlatformRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    public List<Platform> selectPlatformList() {
        return platformRepository.selectPlatformList();
    }

    public void insertPlatform(Platform platform) {
        platform.setPlatformId(UUID.randomUUID().toString());
        platform.setCreatedDate(LocalDateTime.now());
        platform.setModifiedDate(LocalDateTime.now());
        platformRepository.insertPlatform(platform);
    }
}

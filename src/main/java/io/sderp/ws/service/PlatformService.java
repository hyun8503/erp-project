package io.sderp.ws.service;

import io.sderp.ws.exception.BaseException;
import io.sderp.ws.exception.ErrorCode;
import io.sderp.ws.model.Platform;
import io.sderp.ws.model.support.PlatformType;
import io.sderp.ws.repository.PlatformRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    public List<Platform> selectPlatformListByName(String platformName, String typeCode) { return platformRepository.selectPlatformListByName(platformName, typeCode); }
    public List<Platform> selectPlatformList() {
        return platformRepository.selectPlatformList();
    }

    public void insertPlatform(Platform platform) {
        platformNameDuplicateCheck(platform.getPlatformName());

        platform.setPlatformId(UUID.randomUUID().toString());
        platform.setCreatedDate(LocalDateTime.now());
        platform.setModifiedDate(LocalDateTime.now());
        platformRepository.insertPlatform(platform);
    }


    private void platformNameDuplicateCheck(String platformName) {
        long count = platformRepository.selectPlatformNameCount(platformName);
        if(count != 0) {
            throw new BaseException(ErrorCode.PlatformNameDuplicate, HttpStatus.BAD_REQUEST, "platform name must be unique");
        }
    }

    public void updatePalrform(Platform platform) {
        platform.setModifiedDate(LocalDateTime.now());
        platformRepository.updatePaltform(platform);

    }

    public void deletePlatform(String platformId) {
        platformRepository.deletePlatform(platformId);
    }

}

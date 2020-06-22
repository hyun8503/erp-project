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
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional(rollbackFor = Exception.class)
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

    public void updatePlatform(Platform platform) {
        platform.setModifiedDate(LocalDateTime.now());
        platformRepository.updatePlatform(platform);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deletePlatform(String platformId) {
        long count = platformRepository.platformInUse(platformId);
        if(count != 0){
            throw new BaseException(ErrorCode.PlatformInUse, HttpStatus.BAD_REQUEST, "platform is in use");
        }else{
            platformRepository.deletePlatform(platformId);
        }
    }

}

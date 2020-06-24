package io.sderp.ws.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.sderp.ws.model.Platform;
import io.sderp.ws.model.support.PlatformType;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.PlatformService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;



@RestController
@RequestMapping("/api/v1")
public class PlatformController {
    private static final Logger logger = LoggerFactory.getLogger(PlatformService.class);
    private PlatformService platformService;
    private AuthenticationService authenticationService;

    @Autowired
    public PlatformController(PlatformService platformService, AuthenticationService authenticationService) {
        this.platformService = platformService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/platforms")
    public ResponseEntity<List<Platform>> getPlatformList(HttpServletRequest request) {
        return new ResponseEntity<>(platformService.selectPlatformList(), HttpStatus.OK);
    }

    @GetMapping("/platform/{name}/type/{type}")
    public ResponseEntity<List<Platform>> getPlatform(HttpServletRequest request, @PathVariable String name, @PathVariable String type) {
        PlatformType platformType = PlatformType.getInstance(type);
        if(platformType == PlatformType.UNKNOWN) {
            throw new RuntimeException("unknown platform type");
        }

        return new ResponseEntity<>(platformService.selectPlatformListByName(name, type), HttpStatus.OK);
    }

    @PostMapping("/platform")
    public ResponseEntity<Object> insertPlatform(HttpServletRequest httpRequest, @RequestBody Platform param) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String remoteAddr = httpRequest.getRemoteAddr();
        String paramJson = objectMapper.writeValueAsString(param);
        String userId = authenticationService.getUser().getUserId();

        platformService.insertPlatform(param, userId, remoteAddr, paramJson);
        return new ResponseEntity<>(param, HttpStatus.OK);
    }


    //플랫폼 수정
    @PutMapping("/platform")
    public ResponseEntity<Object> updatePlatform(HttpServletRequest httpRequest, @RequestBody Platform param) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String remoteAddr = httpRequest.getRemoteAddr();
        String paramJson = objectMapper.writeValueAsString(param);
        String userId = authenticationService.getUser().getUserId();

        platformService.updatePlatform(param, userId, remoteAddr, paramJson);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //플랫폼 삭제
    @DeleteMapping("/platform/{platformId}")
    public ResponseEntity<Void> deletePlatform(HttpServletRequest httpRequest,  @RequestBody Platform param) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        String paramJson = objectMapper.writeValueAsString(param);
        String remoteAddr = httpRequest.getRemoteAddr();
        String userId = authenticationService.getUser().getUserId();

        platformService.deletePlatform(param, userId, remoteAddr, paramJson);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

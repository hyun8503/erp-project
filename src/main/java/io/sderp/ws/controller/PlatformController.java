package io.sderp.ws.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.sderp.ws.model.Platform;
import io.sderp.ws.model.support.PlatformType;
import io.sderp.ws.service.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PlatformController {
    private PlatformService platformService;

    @Autowired
    public PlatformController(PlatformService platformService) {
        this.platformService = platformService;
    }

    @GetMapping("/platforms")
    public ResponseEntity<List<Platform>> getPlatformList(HttpServletRequest request) {
        return new ResponseEntity<>(platformService.selectPlatformList(), HttpStatus.OK);
    }

    @GetMapping("/platform/{name}/type/{type}")
    public ResponseEntity<List<Platform>> getPlatform(HttpServletRequest request, @PathVariable String name, @PathVariable String type) {
        PlatformType platformType = PlatformType.getInstance(type);
        if(platformType == PlatformType.UnKnown) {
            throw new RuntimeException("unknown platform type");
        }

        return new ResponseEntity<>(platformService.selectPlatformListByName(name, type), HttpStatus.OK);
    }

    @PostMapping("/platform")
    public ResponseEntity<Object> insertPlatform(HttpServletRequest httpRequest, @RequestBody Platform param) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String remoteAddr = httpRequest.getRemoteAddr();
        String paramJsonStr = objectMapper.writeValueAsString(param);

        platformService.insertPlatform(param);
        return new ResponseEntity<>(param, HttpStatus.OK);
    }


    //플랫폼 수정
    @PutMapping("/platform")
    public ResponseEntity<Object> updatePlatform(HttpServletRequest httpRequest, @RequestBody Platform param) throws Exception {
        platformService.updatePlatform(param);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //플랫폼 삭제
    @DeleteMapping("/platform/{platformId}")
    public ResponseEntity<Void> deletePlatform(HttpServletRequest httpRequest, @RequestBody Platform param, @PathVariable String platformId) throws Exception {
        platformService.deletePlatform(platformId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

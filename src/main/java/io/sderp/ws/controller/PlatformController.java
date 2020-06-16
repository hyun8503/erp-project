package io.sderp.ws.controller;

import io.sderp.ws.model.Platform;
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
    public ResponseEntity<List<Platform>> getPlatformList(HttpServletRequest httpRequest) {
        return new ResponseEntity<>(platformService.selectPlatformList(), HttpStatus.OK);
    }

    @PostMapping("/platform")
    public ResponseEntity<Object> insertPlatform(HttpServletRequest httpRequest, @RequestBody Platform param) {
        platformService.insertPlatform(param);
        return new ResponseEntity<>(param, HttpStatus.OK);
    }
}

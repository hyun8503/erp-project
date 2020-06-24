package io.sderp.ws.controller;

import io.sderp.ws.controller.param.ModifyUserParam;
import io.sderp.ws.controller.param.UserParam;
import io.sderp.ws.model.Platform;
import io.sderp.ws.model.User;
import io.sderp.ws.model.support.PlatformType;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.PlatformService;
import io.sderp.ws.service.UserService;
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
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(PlatformService.class);
    private UserService userService;
    private AuthenticationService authenticationService;

    @Autowired
    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser(HttpServletRequest httpRequest) {
        return new ResponseEntity<>(userService.selectAllUser(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserParam> getUser(HttpServletRequest httpRequest, @PathVariable String userId) {
        return new ResponseEntity<>(userService.getUserParam(userId), HttpStatus.OK);
    }

    @PutMapping("/user/my-info")
    public ResponseEntity<Object> getMyInfo(HttpServletRequest httpRequest,  @RequestBody String password) {
        String userId = authenticationService.getUser().getUserId();
        logger.info("password = {}, userId={}", password,userId);
        return new ResponseEntity<>(userService.getMyInfo(password,userId), HttpStatus.OK);
    }

    @PutMapping("/user")
    public ResponseEntity<Object> updateUser(HttpServletRequest httpRequest, @RequestBody ModifyUserParam modifyUserParam) {
        userService.modifyUser(modifyUserParam);
        return new ResponseEntity<>(modifyUserParam, HttpStatus.OK);
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Object> deleteUser(HttpServletRequest httpRequest, @PathVariable String userId) {
        userService.withdrawUser(userId);
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }

    @GetMapping("/user/{platform}/role/{role}/name/{name}")
    public ResponseEntity<List<User>> searchUser(HttpServletRequest request, @PathVariable String platform, @PathVariable String role, @PathVariable String name) {
        return new ResponseEntity<>(userService.searchUserList(platform, role, name), HttpStatus.OK);
    }
}

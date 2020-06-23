package io.sderp.ws.controller;

import io.sderp.ws.controller.param.ModifyUserParam;
import io.sderp.ws.controller.param.UserParam;
import io.sderp.ws.model.User;
import io.sderp.ws.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUser(HttpServletRequest httpRequest) {
        return new ResponseEntity<>(userService.selectAllUser(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserParam> getUser(HttpServletRequest httpRequest, @PathVariable String userId) {
        return new ResponseEntity<>(userService.getUserParam(userId), HttpStatus.OK);
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
}

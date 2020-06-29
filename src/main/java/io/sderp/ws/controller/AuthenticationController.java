package io.sderp.ws.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.sderp.ws.controller.param.SignUpParam;
import io.sderp.ws.exception.CanNotFoundUserException;
import io.sderp.ws.model.SimpleUser;
import io.sderp.ws.model.User;
import io.sderp.ws.model.UserToken;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.UserService;
import io.sderp.ws.util.UserAgentUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1/authentications/")
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    private AuthenticationService authenticationService;
    private UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/signin")
    public ResponseEntity<UserToken> getLoginToken(HttpServletRequest httpRequest, HttpSession session, @RequestHeader("User-Agent") String userAgent, @RequestBody User account) {
        final UserToken token = authenticationService.getToken(account.getLoginId(), account.getLoginPassword(), session, userAgent, httpRequest.getRemoteAddr());
        logger.trace("browser = {}, os = {}", UserAgentUtil.getBrowser(userAgent), UserAgentUtil.getOS(userAgent));
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/signUp")
    public ResponseEntity<User> signUp(HttpServletRequest httpRequest, HttpSession session, @RequestBody SignUpParam signUpParam) throws JsonProcessingException {
        if(signUpParam.getUserId().isEmpty() || signUpParam.getUserPwd().isEmpty() || signUpParam.getUserPlatformIdList().isEmpty() || signUpParam.getUserRoleId().isEmpty()) {
            throw new RuntimeException("check request param");
        }

        User user = userService.signUp(signUpParam, httpRequest.getRemoteAddr());
        user.setLoginPassword("");
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity logout(HttpServletRequest httpRequest, HttpServletResponse resp) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            new SecurityContextLogoutHandler().logout(httpRequest, resp, auth);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/signcheck")
    public ResponseEntity<SimpleUser> check(HttpServletRequest httpRequest) {
        final SimpleUser user = authenticationService.getUser();

        if(user == null) {
            throw new CanNotFoundUserException();
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

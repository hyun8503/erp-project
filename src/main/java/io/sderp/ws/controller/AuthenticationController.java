package io.sderp.ws.controller;

import io.sderp.ws.exception.CanNotFoundUserException;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.model.BaseSimpleUser;
import io.sderp.ws.model.BaseUser;
import io.sderp.ws.model.BaseUserToken;
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
    private AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signin")
    public ResponseEntity<BaseUserToken> getLoginToken(HttpServletRequest httpRequest, HttpSession session, @RequestBody BaseUser account) {
        final BaseUserToken token = authenticationService.getToken(account.getId(), account.getPassword(), session);

        return new ResponseEntity<>(token, HttpStatus.OK);
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
    public ResponseEntity<BaseSimpleUser> check(HttpServletRequest httpRequest) {
        final BaseSimpleUser user = authenticationService.getUser();

        if(user == null) {
            throw new CanNotFoundUserException();
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}

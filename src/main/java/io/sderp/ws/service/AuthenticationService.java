package io.sderp.ws.service;

import io.sderp.ws.model.SimpleUser;
import io.sderp.ws.model.UserToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class AuthenticationService {
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public UserToken getToken(String id, String rawPassword, HttpSession session) {
        final Authentication request = new UsernamePasswordAuthenticationToken(id, rawPassword);
        final Authentication result = authenticationManager.authenticate(request);

        if ((result != null) && (result.isAuthenticated())) {
            SecurityContextHolder.getContext().setAuthentication(result);
        } else {
            return null;
        }

        return UserToken.builder()
                .token(session.getId())
                .user((SimpleUser) result.getDetails())
                .build();
    }

    public SimpleUser getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return (SimpleUser) authentication.getDetails();
    }


}

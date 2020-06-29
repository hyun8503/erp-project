package io.sderp.ws.service;

import io.sderp.ws.model.SimpleUser;
import io.sderp.ws.model.UserLoginHistory;
import io.sderp.ws.model.UserToken;
import io.sderp.ws.repository.UserLoginHistoryRepository;
import io.sderp.ws.util.UserAgentUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;

@Service
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    private AuthenticationManager authenticationManager;
    private UserLoginHistoryRepository userLoginHistoryRepository;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, UserLoginHistoryRepository userLoginHistoryRepository) {
        this.authenticationManager = authenticationManager;
        this.userLoginHistoryRepository = userLoginHistoryRepository;
    }

    public UserToken getToken(String id, String rawPassword, HttpSession session, String userAgent, String remoteAddr) {
        final Authentication request = new UsernamePasswordAuthenticationToken(id, rawPassword);
        final Authentication result = authenticationManager.authenticate(request);

        if ((result != null) && (result.isAuthenticated())) {
            SecurityContextHolder.getContext().setAuthentication(result);
        } else {
            return null;
        }

        userLoginHistoryRepository.insertUserLoginHistory(UserLoginHistory.builder()
                .browser(UserAgentUtil.getBrowser(userAgent))
                .os(UserAgentUtil.getOS(userAgent))
                .userId(getUser().getUserId())
                .ipAddress(remoteAddr)
                .createdDate(LocalDateTime.now())
                .build());

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

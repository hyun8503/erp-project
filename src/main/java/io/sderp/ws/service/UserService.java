package io.sderp.ws.service;

import io.sderp.ws.controller.param.SignUpParam;
import io.sderp.ws.exception.BaseException;
import io.sderp.ws.exception.ErrorCode;
import io.sderp.ws.exception.NotAcceptableIdException;
import io.sderp.ws.model.User;
import io.sderp.ws.model.UserPlatform;
import io.sderp.ws.model.UserRole;
import io.sderp.ws.model.support.UserStatusType;
import io.sderp.ws.model.support.UserType;
import io.sderp.ws.repository.UserPlatformRepository;
import io.sderp.ws.repository.UserRepository;
import io.sderp.ws.repository.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private static final String DEFAULT_ADMIN_ID = "admin";
    private static final String DEFAULT_ADMIN_PASSWORD = "1234";
    private static final String DEFAULT_ADMIN_NAME = "administrator";
    private static final Map<String, Boolean> notAcceptableIdMap = new HashMap<>();
    static {
        notAcceptableIdMap.put("check", false);
        notAcceptableIdMap.put("signin", false);
        notAcceptableIdMap.put("signout", false);
        notAcceptableIdMap.put("signcheck", false);
        notAcceptableIdMap.put("login", false);
        notAcceptableIdMap.put("logout", false);
        notAcceptableIdMap.put("logincheck", false);
    }

    private PasswordEncoder passwordEncoder;
    private UserRepository repository;
    private UserRoleRepository userRoleRepository;
    private UserPlatformRepository userPlatformRepository;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder, UserRoleRepository userRoleRepository, UserPlatformRepository userPlatformRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.userRoleRepository = userRoleRepository;
        this.userPlatformRepository = userPlatformRepository;
    }

    @PostConstruct
    public void checkAdmin() {
        final List<User> users = getUsers(UserType.Admin);

        if((users == null) || (users.size() < 1)) {
            logger.info("Admin account not exists : create a default admin account");

            final User newAdmin = User.builder()
                    .userId(UUID.randomUUID().toString())
                    .loginId(DEFAULT_ADMIN_ID)
                    .loginPassword(DEFAULT_ADMIN_PASSWORD)
                    .typeCode(UserType.Admin)
                    .statusCode(UserStatusType.Normal)
                    .build();

            createNewUser(newAdmin);
        }
    }

    public User getUser(String id) {
        return repository.selectUser(id);
    }

    public List<User> selectAllUser() { return repository.selectAllUser(); }
    public List<User> getUsers(UserType type) {
        return repository.selectUsers(type);
    }

    @Transactional(rollbackFor = Exception.class)
    public User signUp(SignUpParam signUpParam) {
        loginIdDuplicateCheck(signUpParam.getUserId());
        List<String> platformIdList = signUpParam.getUserPlatformIdList();
        final String userId = UUID.randomUUID().toString();
        final User newUser = User.builder()
                .userId(userId)
                .loginId(signUpParam.getUserId())
                .loginPassword(signUpParam.getUserPwd())
                .statusCode(UserStatusType.Normal)
                .typeCode(UserType.Normal)
                .build();

        final UserRole userRole = UserRole.builder()
                .userId(userId)
                .roleId(signUpParam.getUserRoleId())
                .createdDate(LocalDateTime.now())
                .build();

        createNewUser(newUser);
        userRoleRepository.insertUserRole(userRole);
        for (String platformId : platformIdList) {
            userPlatformRepository.insertUserPlatform(UserPlatform.builder()
                    .userId(userId)
                    .platformId(platformId)
                    .createdDate(LocalDateTime.now())
                    .modifiedDate(LocalDateTime.now())
                    .build());
        }

        return newUser;
    }

    public User createNewUser(User user) {
        if(isNotAcceptableId(user.getUserId())) {
            throw new NotAcceptableIdException(user.getUserId());
        }
        final String encodedPassword = passwordEncoder.encode(user.getLoginPassword());

        user.setLoginPassword(encodedPassword);
        user.setCreatedDate(LocalDateTime.now());
        user.setModifiedDate(LocalDateTime.now());

        repository.insertUser(user);

        return user;
    }

    private void loginIdDuplicateCheck(String loginId) {
        long count = repository.selectUserCount(loginId);
        if(count != 0) {
            throw new BaseException(ErrorCode.LOGIN_ID_IN_USE, HttpStatus.BAD_REQUEST, "login id in use");
        }
    }

    private boolean isNotAcceptableId(String id) {
        boolean isNotAcceptable = false;

        if((id == null) || (id.length() < 1) || (id.contains(" ")) || (notAcceptableIdMap.containsKey(id.toLowerCase()))) {
            isNotAcceptable = true;
        }

        return isNotAcceptable;
    }
}

package io.sderp.ws.controller;

import io.sderp.ws.model.Permission;
import io.sderp.ws.model.support.PermissionType;
import io.sderp.ws.model.support.UserType;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.PermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PermissionController {
        private static final Logger logger = LoggerFactory.getLogger(PermissionService.class);
        private PermissionService permissionService;
        private AuthenticationService authenticationService;

        @Autowired
        public PermissionController(PermissionService permissionService, AuthenticationService authenticationService) {
            this.permissionService = permissionService;
            this.authenticationService = authenticationService;
        }

        @GetMapping("/permission")
        public ResponseEntity<List<Permission>> getPermissionList(HttpServletRequest request) {
            List<Permission> permissionList = new ArrayList<>();
            if(authenticationService.getUser().getTypeCode() == UserType.ADMIN) {
                List<Permission> newPermissions = new ArrayList<>();
                permissionList = permissionService.allPermissionList();
                for (Permission permission: permissionList) {
                    if(permission.getPermissionName() != PermissionType.REPORT_SUBMIT) {
                        newPermissions.add(permission);
                    }
                }
                permissionList = newPermissions;
            } else if(authenticationService.getUser().getTypeCode() == UserType.NORMAL) {
                String userId = authenticationService.getUser().getUserId();
                permissionList = permissionService.getPermissionList(userId);
            }
            return new ResponseEntity<>(permissionList, HttpStatus.OK);
        }


    }


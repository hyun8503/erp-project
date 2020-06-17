package io.sderp.ws.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/api/v1")
public class RoleController {
    public RoleController() {

    }

    @PostMapping("/role")
    public ResponseEntity<Object> insertRole(HttpServletRequest httpRequest) {
        return null;
    }
}

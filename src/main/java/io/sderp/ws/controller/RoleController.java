package io.sderp.ws.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.sderp.ws.controller.param.AddRoleParam;
import io.sderp.ws.controller.param.RoleListParam;
import io.sderp.ws.model.Role;
import io.sderp.ws.model.RoleWithPermission;
import io.sderp.ws.service.AuthenticationService;
import io.sderp.ws.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RoleController {
    private RoleService roleService;
    private AuthenticationService authenticationService;

    @Autowired
    public RoleController(RoleService roleService, AuthenticationService authenticationService) {
        this.roleService = roleService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/role-with-permission")
    public ResponseEntity<List<RoleWithPermission>> selectRoleWithPermission(HttpServletRequest httpRequest) {
        return new ResponseEntity<>(roleService.selectRoleWithPermission(), HttpStatus.OK);
        //roleService
    }

    @GetMapping("/roles")
    public ResponseEntity<List<RoleListParam>> selectAllRole(HttpServletRequest httpRequest) {
        return new ResponseEntity<>(roleService.selectAllRole(), HttpStatus.OK);
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<RoleListParam> selectRole(HttpServletRequest httpRequest, @PathVariable String roleId) {
        return new ResponseEntity<>(roleService.selectRolePermission(roleId), HttpStatus.OK);
    }

    @GetMapping("/roles/name/{roleName}")
    public ResponseEntity<List<RoleListParam>> selectRoleByName(HttpServletRequest httpRequest, @PathVariable String roleName) {
        return new ResponseEntity<>(roleService.selectRoleByName(roleName), HttpStatus.OK);
    }

    @PutMapping("/role")
    public ResponseEntity<RoleListParam> updateRole(HttpServletRequest httpRequest, @RequestBody RoleListParam roleListParam) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        String remoteAddr = httpRequest.getRemoteAddr();
        String paramJson = objectMapper.writeValueAsString(roleListParam);
        String userId = authenticationService.getUser().getUserId();

        roleService.updateRole(roleListParam, userId, remoteAddr, paramJson);
        return new ResponseEntity<>(roleListParam, HttpStatus.OK);
    }

    @PostMapping("/role")
    public ResponseEntity<Object> insertRole(HttpServletRequest httpRequest, @RequestBody AddRoleParam param) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        String remoteAddr = httpRequest.getRemoteAddr();
        String paramJson = objectMapper.writeValueAsString(param);
        String userId = authenticationService.getUser().getUserId();

        roleService.insertRole(param,userId, remoteAddr, paramJson);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/role/{roleId}")
    public ResponseEntity<Object> deleteRole(HttpServletRequest httpRequest, @RequestBody Role param) throws Exception{
        ObjectMapper objectMapper = new ObjectMapper();
        String paramJson = objectMapper.writeValueAsString(param);
        String remoteAddr = httpRequest.getRemoteAddr();
        String userId = authenticationService.getUser().getUserId();

        roleService.deleteRole(param, userId, remoteAddr, paramJson);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

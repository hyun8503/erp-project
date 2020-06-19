package io.sderp.ws.controller;

import io.sderp.ws.controller.param.AddRoleParam;
import io.sderp.ws.controller.param.RoleListParam;
import io.sderp.ws.model.RoleWithPermission;
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

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
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

    @PutMapping("/role")
    public ResponseEntity<RoleListParam> updateRole(HttpServletRequest httpRequest, @RequestBody RoleListParam roleListParam) {
        roleService.updateRole(roleListParam);
        return new ResponseEntity<>(roleListParam, HttpStatus.OK);
    }

    @PostMapping("/role")
    public ResponseEntity<Object> insertRole(HttpServletRequest httpRequest, @RequestBody AddRoleParam param) {
        roleService.insertRole(param);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

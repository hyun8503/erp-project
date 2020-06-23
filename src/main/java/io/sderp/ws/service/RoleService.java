package io.sderp.ws.service;

import io.sderp.ws.controller.param.AddRoleParam;
import io.sderp.ws.controller.param.RoleListParam;
import io.sderp.ws.exception.BaseException;
import io.sderp.ws.exception.ErrorCode;
import io.sderp.ws.model.Permission;
import io.sderp.ws.model.Role;
import io.sderp.ws.model.RoleWithPermission;
import io.sderp.ws.model.support.PermissionType;
import io.sderp.ws.repository.PermissionRepository;
import io.sderp.ws.repository.RolePermissionRepository;
import io.sderp.ws.repository.RoleRepository;
import io.sderp.ws.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class RoleService {
    private RoleRepository roleRepository;
    private RolePermissionRepository rolePermissionRepository;
    private PermissionRepository permissionRepository;
    private UserRoleRepository userRoleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, RolePermissionRepository rolePermissionRepository, PermissionRepository permissionRepository, UserRoleRepository userRoleRepository) {
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
        this.userRoleRepository = userRoleRepository;
    }

    public RoleListParam selectRolePermission(String roleId) {
        Role role = roleRepository.selectRole(roleId);
        List<Permission> permissionList = permissionRepository.selectPermissionByRole(roleId);

        return RoleListParam.builder()
                .role(role)
                .permissionList(permissionList)
                .build();
    }

    public List<RoleListParam> selectAllRole() {
        List<RoleListParam> roleListParam = new ArrayList<>();
        List<Role> roleList = roleRepository.selectAllRole();
        for (Role role: roleList) {
            List<Permission> permissionList = permissionRepository.selectPermissionByRole(role.getRoleId());
            roleListParam.add(RoleListParam.builder()
                    .role(role)
                    .permissionList(permissionList)
                    .build());
        }

        return roleListParam;
    }

    public List<RoleListParam> selectRoleByName(String name) {
        List<RoleListParam> roleListParam = new ArrayList<>();
        List<Role> roleList = roleRepository.selectRoleByName(name);
        for (Role role: roleList) {
            List<Permission> permissionList = permissionRepository.selectPermissionByRole(role.getRoleId());
            roleListParam.add(RoleListParam.builder()
                    .role(role)
                    .permissionList(permissionList)
                    .build());
        }

        return roleListParam;
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertRole(AddRoleParam param) {
        roleNameDuplicateCheck(param.getRoleName());
        LocalDateTime now = LocalDateTime.now();
        String roleId = UUID.randomUUID().toString();

        Role role = Role.builder()
                .roleId(roleId)
                .roleName(param.getRoleName())
                .createdDate(now)
                .modifiedDate(now)
                .build();

        roleRepository.insertRole(role);
        insertRolePermission(roleId, param.getPermissionList());
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateRole(RoleListParam roleListParam) {
        Role role = roleListParam.getRole();
        List<Permission> permissionList = roleListParam.getPermissionList();
        role.setModifiedDate(LocalDateTime.now());

        roleRepository.updateRole(role);
        rolePermissionRepository.deleteRolePermission(role.getRoleId());

        for (Permission permission : permissionList) {
            rolePermissionRepository.insertRolePermission(role.getRoleId(), permission.getPermissionName());
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteRole(String roleId) {
        userRoleInUseCheck(roleId);
        rolePermissionRepository.deleteRolePermission(roleId);
        roleRepository.deleteRole(roleId);
    }

    private void userRoleInUseCheck(String roleId) {
        long count = userRoleRepository.selectUserRoleCount(roleId);
        if(count != 0) {
            throw new BaseException(ErrorCode.ROLE_IN_USE, HttpStatus.BAD_REQUEST, "role in use");
        }
    }

    private void insertRolePermission(String roleId, List<PermissionType> permissionList) {
        for (PermissionType type: permissionList) {
            rolePermissionRepository.insertRolePermission(roleId, type);
        }
    }

    private void roleNameDuplicateCheck(String roleName) {
        long count = roleRepository.selectRoleNameCount(roleName);
        if(count != 0) {
            throw new BaseException(ErrorCode.ROLE_NAME_DUPLICATE, HttpStatus.BAD_REQUEST, "role name must be unique");
        }
    }

    public List<RoleWithPermission> selectRoleWithPermission() {
        return roleRepository.selectRoleWithPermission();
    }
}

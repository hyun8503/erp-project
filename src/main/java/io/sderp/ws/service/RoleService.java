package io.sderp.ws.service;

import io.sderp.ws.controller.param.AddRoleParam;
import io.sderp.ws.controller.param.RoleListParam;
import io.sderp.ws.exception.BaseException;
import io.sderp.ws.exception.ErrorCode;
import io.sderp.ws.model.Permission;
import io.sderp.ws.model.Role;
import io.sderp.ws.model.RoleWithPermission;
import io.sderp.ws.model.UserActionHistories;
import io.sderp.ws.model.support.PermissionType;
import io.sderp.ws.model.support.UserActionHistoryStatus;
import io.sderp.ws.model.support.UserActionHistoryType;
import io.sderp.ws.repository.*;
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
    private UserActionHistoryRepository userActionHistoryRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, RolePermissionRepository rolePermissionRepository, PermissionRepository permissionRepository, UserRoleRepository userRoleRepository,
                       UserActionHistoryRepository userActionHistoryRepository) {
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.userActionHistoryRepository =userActionHistoryRepository;
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
    //역할 등록
    @Transactional(rollbackFor = Exception.class)
    public void insertRole(AddRoleParam param, String userId, String remoteAddr, String paramJson) {
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


        UserActionHistories userActionHistories = UserActionHistories.builder()
                .userId(userId)
                .typeCode(UserActionHistoryType.ROLE)
                .statusCode(UserActionHistoryStatus.CREATE)
                .description(paramJson)
                .ipAddress(remoteAddr)
                .build();

        userActionHistoryRepository.insertActionHistory(userActionHistories);
    }

   //역할 수정
    @Transactional(rollbackFor = Exception.class)
    public void updateRole(RoleListParam roleListParam, String userId, String remoteAddr, String paramJson) {
        Role role = roleListParam.getRole();
        List<Permission> permissionList = roleListParam.getPermissionList();
        role.setModifiedDate(LocalDateTime.now());

        roleRepository.updateRole(role);
        rolePermissionRepository.deleteRolePermission(role.getRoleId());

        for (Permission permission : permissionList) {
            rolePermissionRepository.insertRolePermission(role.getRoleId(), permission.getPermissionName());
        }

        UserActionHistories userActionHistories = UserActionHistories.builder()
                .userId(userId)
                .typeCode(UserActionHistoryType.ROLE)
                .statusCode(UserActionHistoryStatus.UPDATE)
                .description(paramJson)
                .ipAddress(remoteAddr)
                .build();

        userActionHistoryRepository.insertActionHistory(userActionHistories);
    }
    //역할 삭제
    @Transactional(rollbackFor = Exception.class)
    public void deleteRole(Role param, String userId, String remoteAddr, String paramJson) {
        userRoleInUseCheck(param.getRoleId());
        rolePermissionRepository.deleteRolePermission(param.getRoleId());
        roleRepository.deleteRole(param.getRoleId());

        UserActionHistories userActionHistories = UserActionHistories.builder()
                .userId(userId)
                .typeCode(UserActionHistoryType.ROLE)
                .statusCode(UserActionHistoryStatus.DELETE)
                .description(paramJson)
                .ipAddress(remoteAddr)
                .build();

        userActionHistoryRepository.insertActionHistory(userActionHistories);
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

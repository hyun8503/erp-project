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

    @Autowired
    public RoleService(RoleRepository roleRepository, RolePermissionRepository rolePermissionRepository, PermissionRepository permissionRepository) {
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
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

    private void insertRolePermission(String roleId, List<PermissionType> permissionList) {
        for (PermissionType type: permissionList) {
            rolePermissionRepository.insertRolePermission(roleId, type);
        }
    }

    private void roleNameDuplicateCheck(String roleName) {
        long count = roleRepository.selectRoleNameCount(roleName);
        if(count != 0) {
            throw new BaseException(ErrorCode.RoleNameDuplicate, HttpStatus.BAD_REQUEST, "role name must be unique");
        }
    }

    public List<RoleWithPermission> selectRoleWithPermission() {
        return roleRepository.selectRoleWithPermission();
    }
}

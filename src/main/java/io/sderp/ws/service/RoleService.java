package io.sderp.ws.service;

import io.sderp.ws.controller.param.AddRoleParam;
import io.sderp.ws.exception.BaseException;
import io.sderp.ws.exception.ErrorCode;
import io.sderp.ws.model.Permission;
import io.sderp.ws.model.Role;
import io.sderp.ws.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertRole(AddRoleParam param) {
        roleNameDuplicateCheck(param.getRoleName());

        LocalDateTime now = LocalDateTime.now();
        Role role = Role.builder()
                .roleId(UUID.randomUUID().toString())
                .roleName(param.getRoleName())
                .createdDate(now)
                .modifiedDate(now)
                .build();

        roleRepository.insertRole(role);
    }

    private void insertRolePermission(String roleId, List<Permission> permissionList) {

    }

    private void roleNameDuplicateCheck(String roleName) {
        long count = roleRepository.selectRoleNameCount(roleName);
        if(count != 0) {
            throw new BaseException(ErrorCode.RoleNameDuplicate, HttpStatus.BAD_REQUEST, "role name must be unique");
        }
    }
}

package io.sderp.ws.service;

import io.sderp.ws.model.Permission;
import io.sderp.ws.model.Platform;
import io.sderp.ws.model.support.PermissionType;
import io.sderp.ws.repository.PermissionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class PermissionService {
    private static final Logger logeger = LoggerFactory.getLogger(PermissionService.class);
    private PermissionRepository permissionRepository;

    @Autowired
    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
        List<Permission> permissionList = permissionRepository.selectAllPermission();
        if (permissionList.size() == 0) {
            logeger.info("insert initialize permission table");
            insertPermissionList(getInitPermissionList());
        }
    }

    private List<Permission> getInitPermissionList() {
        List<Permission> permissionList = new ArrayList<Permission>();
        LocalDateTime now = LocalDateTime.now();
        PermissionType[] types = PermissionType.values();
        for (PermissionType type : types) {
            permissionList.add(Permission.builder()
                    .permissionId(UUID.randomUUID().toString())
                    .permissionName(type)
                    .createdDate(now)
                    .modifiedDate(now)
                    .build());
        }

        return permissionList;
    }

    public Permission selectPermission(String id) {
        return permissionRepository.selectPermission(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertPermissionList(List<Permission> permissionList) {
        for (Permission permission : permissionList) {
            permissionRepository.insertPermission(permission);
        }
    }

    public List<Permission> getPermissionList(String userId) {
            return permissionRepository.getPermissionList(userId);
    }

    public List<Permission> allPermissionList() {
        return permissionRepository.selectAllPermission();
    }
}

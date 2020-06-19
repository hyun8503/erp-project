package io.sderp.ws.repository;

import io.sderp.ws.model.Permission;
import io.sderp.ws.repository.mapper.PermissionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PermissionRepository {
    private PermissionMapper mapper;

    @Autowired
    public PermissionRepository(PermissionMapper mapper) {
        this.mapper = mapper;
    }

    public List<Permission> selectAllPermission() {return  mapper.selectAllPermission();}
    public List<Permission> selectPermissionByRole(String roleId) { return mapper.selectPermissionByRole(roleId);}
    public Permission selectPermission(String id) { return mapper.selectPermission(id); }
    public int insertPermission(Permission permission) {
        return mapper.insertPermission(permission);
    }
}

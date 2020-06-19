import {action, flow, observable} from "mobx";
import * as PermissionType from "../type/PermissionType";
import * as ErrorType from "../type/ErrorType";
import axios from "axios";

export default class RoleStore {
    @observable isAddRoleDialog = false;
    @observable roleName = '';
    @observable addRolePermissionList = {
        [PermissionType.type.RoleManagement]: false,
        [PermissionType.type.UserManagement]: false,
        [PermissionType.type.PlatformManagement]: false,
        [PermissionType.type.ReportTemplate]: false,
        [PermissionType.type.ReportSearch]: false,
        [PermissionType.type.ReportSubmit]: false,
    };
    @observable addRoleList = [];
    @observable addingRole = false;
    @observable confirmDialogOpen = false;
    @observable confirmDialogMsg = "";
    @observable roleList = [];

    @observable isUpdateDialog = false;
    @observable updateDialogRoleName = "";
    @observable updateDialogRole = "";
    @observable updateDialogPermissionList = [];
    @observable updatingRole = false;
    @observable updateRoleId = "";

    @action initStore = () => {
        this.isAddRoleDialog = false;
        this.roleName = '';
        this.addRolePermissionList = {
            [PermissionType.type.RoleManagement]: false,
            [PermissionType.type.UserManagement]: false,
            [PermissionType.type.PlatformManagement]: false,
            [PermissionType.type.ReportTemplate]: false,
            [PermissionType.type.ReportSearch]: false,
            [PermissionType.type.ReportSubmit]: false,
        }
        this.addRoleList = [];
        this.addingRole = false;
        this.confirmDialogOpen = false;
        this.confirmDialogMsg = "";
        this.roleList = [];
        this.isUpdateDialog = false;
        this.updateDialogRoleName = "";
        this.updateDialogPermissionList = [];
        this.updatingRole = false;
        this.updateRoleId = "";
    }

    @action initAddRoleDialog = () => {
        this.isAddRoleDialog = false;
        this.roleName = '';
        this.addRoleList = [];
        this.addRolePermissionList = {
            [PermissionType.type.RoleManagement]: false,
            [PermissionType.type.UserManagement]: false,
            [PermissionType.type.PlatformManagement]: false,
            [PermissionType.type.ReportTemplate]: false,
            [PermissionType.type.ReportSearch]: false,
            [PermissionType.type.ReportSubmit]: false,
        }
    }

    @action initUpdateDialog = () => {
        this.isUpdateDialog = false;
        this.updateDialogRoleName = "";
        this.updateDialogRole = "";
        this.updateDialogPermissionList = [];
        this.updatingRole = false;
        this.updateRoleId = "";
    }

    @action changeUpdateDialogRoleName = (value) => {
        value = value ? value.trim() : value;
        this.updateDialogRoleName = value
    };
    @action changeIsUpdateDialog = (value) => {
        this.isUpdateDialog = value;
        if(!value) {
            this.initAddRoleDialog();
        }
    };
    @action addUpdateRoleList = (target, value) => {
        if(value) {
            this.updateDialogPermissionList.push(target);
        } else {
            const delIdx = this.updateDialogPermissionList.findIndex((item) => item === target);
            if(delIdx !== -1) {
                this.updateDialogPermissionList.splice(delIdx, 1);
            }
        }
    }

    @action changeIsAddRoleDialog = (value) => {
        this.isAddRoleDialog = value;
        if(!value) {
            this.initAddRoleDialog();
        }
    };
    @action changeRoleName = (value) => {
        value = value ? value.trim() : value;
        this.roleName = value;
    };

    @action changeAddRoleCheckList = (target, value) => {
        this.addRolePermissionList[target] = value
        if(value) {
            this.addRoleList.push(target);
        } else {
            const delIdx = this.addRoleList.findIndex((item) => item === target);
            if(delIdx !== -1) {
                this.addRoleList.splice(delIdx, 1);
            }
        }
    };

    @action confirmDialogClose = () => {
        this.confirmDialogOpen = false;
    }

    @action confirmDialogHandle = () => {
        this.confirmDialogOpen = false;
        this.confirmDialogMsg = "";
    }

    getRoleList = flow(function* () {
        this.roleList = [];
        try {
            const response = yield axios.get(`/api/v1/roles`);
            this.roleList = response.data;
        } catch (err) {
            console.log('getRoleList error');
            console.log(err);
            this.roleList = [];
        }
    });

    getUpdateRole = flow(function* (roleId) {
        this.updateDialogRole = ""
        try {
            const response = yield axios.get(`/api/v1/role/${roleId}`);
            if(!response.data) {
                new Error("getUpdateRole SomeThing Wrong");
            }

            this.updateRoleId = response.data.role.roleId;
            this.updateDialogRoleName = response.data.role.roleName;
            this.updateDialogPermissionList = response.data.permissionList.map((item) => item.permissionName);
            this.isUpdateDialog = true;
        } catch (err) {
            console.log('getUpdateRole error');
            console.log(err);
        }
    });

    addRole = flow(function* () {
        this.addingRole = true;
        try {
            yield axios.post(`/api/v1/role`, {
                roleName: this.roleName,
                permissionList: this.addRoleList,
            });

            this.addingRole = false;
            this.initAddRoleDialog();
            this.getRoleList();
        } catch (err) {
            console.log('add role error');
            console.log(err);
            this.addingRole = false;
            if(err.response.data.code === ErrorType.code.RoleNameDuplicate) {
                this.confirmDialogMsg = "역할 이름이 이미 존재합니다";
                this.confirmDialogOpen = true;
            } else {
                this.initAddRoleDialog();
            }
        }
    });

    updateRole = flow(function* () {
        this.updatingRole = true;
        try {
            yield axios.put(`/api/v1/role`, {
                role: {
                    roleId: this.updateRoleId,
                    roleName: this.updateDialogRoleName
                },
                permissionList: this.updateDialogPermissionList.map((item) => {
                    return {
                        permissionName: item
                    }
                })
            });
            this.updatingRole = false
            this.roleList = [];
            this.getRoleList();
            this.initUpdateDialog();
        } catch (err) {
            console.log('updateRole');
            console.log(err);
            this.updatingRole = false
            if(err.response.data.code === ErrorType.code.RoleNameDuplicate) {
                this.confirmDialogMsg = "역할 이름이 이미 존재합니다";
                this.confirmDialogOpen = true;
            } else {
                this.initUpdateDialog();
            }
        }
    })
}
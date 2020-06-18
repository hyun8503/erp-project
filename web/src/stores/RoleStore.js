import {action, flow, observable} from "mobx";
import * as PermissionType from "../type/PermissionType";
import * as ErrorType from "../type/ErrorType";
import axios from "axios";

export default class RoleStore {
    @observable isAddRoleDialog = false;
    @observable roleName = '';
    @observable addRoleCheckList = {
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

    @action initStore = () => {
        this.isAddRoleDialog = false;
        this.roleName = '';
        this.addRoleCheckList = {
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
    }

    @action initAddRoleDialog = () => {
        this.isAddRoleDialog = false;
        this.roleName = '';
        this.addRoleList = [];
        this.addRoleCheckList = {
            [PermissionType.type.RoleManagement]: false,
            [PermissionType.type.UserManagement]: false,
            [PermissionType.type.PlatformManagement]: false,
            [PermissionType.type.ReportTemplate]: false,
            [PermissionType.type.ReportSearch]: false,
            [PermissionType.type.ReportSubmit]: false,
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
        this.addRoleCheckList[target] = value
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

    addRole = flow(function* () {
        this.addingRole = true;
        try {
            yield axios.post(`/api/v1/role`, {
                roleName: this.roleName,
                permissionList: this.addRoleList,
            });

            this.addingRole = false;
            this.initAddRoleDialog();
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
}
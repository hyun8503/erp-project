import {action, observable} from "mobx";
import * as PermissionType from "../type/PermissionType";

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
    }
    
    @action changeIsAddRoleDialog = (value) => {
        this.isAddRoleDialog = value;
        if(!value) {
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
}
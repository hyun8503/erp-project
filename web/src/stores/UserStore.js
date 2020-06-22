import {action, flow, observable} from "mobx";
import RoleAdapter from "../adapter/RoleAdapter";
import PlatformAdapter from "../adapter/PlatformAdapter";

export default class UserStore {
    @observable isAddUserDialog = false;
    @observable addUserId = "";
    @observable addUserPwd = "";
    @observable addUserRoleId = "none";
    @observable addUserPlatformIdList = [];
    @observable addUserSelectRoleList = [];
    @observable addUserPlatformList = [];


    @action initStore = () => {
        this.isAddUserDialog = false;
    }

    @action initAddDialog = () => {
        this.isAddUserDialog = false;
        this.addUserId = "";
        this.addUserPwd = "";
        this.addUserRoleId = "none";
        this.addUserPlatformIdList = [];
        this.addUserSelectRoleList = [];
        this.addUserPlatformList = [];
    }

    @action changeIsAddUserDialog = (value) => {
        this.isAddUserDialog = value;
        if(value) {
            this.getRoleList();
            this.getPlatformList();
        } else {
            this.initAddDialog();
        }
    }

    @action changeAddUserId = (value) => {
        value = value ? value.trim() : value;
        this.addUserId = value;
    }

    @action changeAddUserPwd = (value) => {
        value = value ? value.trim() : value;
        this.addUserPwd = value;
    }

    @action changeAddUserRoleId = (value) => this.addUserRoleId = value;
    @action changeAddUserPlatformIdList = (value, checked) => {
        if(value) {
            this.addUserPlatformIdList.push(value);
        } else {

        }
    }

    getRoleList = flow(function* () {
        this.addUserSelectRoleList = [];
        const userRoleAdapter = new RoleAdapter();
        this.addUserSelectRoleList = yield userRoleAdapter.getRoleList();
    });

    getPlatformList = flow(function* () {
        this.addUserPlatformList = []
        const platformAdapter = new PlatformAdapter();
        this.addUserPlatformList = yield platformAdapter.getPlatformList();
    });
}
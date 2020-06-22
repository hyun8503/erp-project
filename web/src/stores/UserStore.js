import {action, flow, observable} from "mobx";
import axios from "axios";
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
    @observable addUserSearchPlatformName = "";
    @observable addingUser = false;

    @observable isModifyUserDialog = false;
    @observable modifyUserRoleId = "none";
    @observable modifyUserPlatformIdList = [];
    @observable modifyUserSelectRoleList = [];
    @observable modifyUserPlatformList = [];
    @observable modifyUserSearchPlatformName = "";
    @observable modifyingUser = false;

    @observable userList = [];


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
        this.addUserSearchPlatformName = "";
        this.addingUser = false;
    }

    @action initModifyDialog = () => {
        this.isModifyUserDialog = false;
        this.modifyUserRoleId = "none";
        this.modifyUserPlatformIdList = [];
        this.modifyUserSelectRoleList = [];
        this.modifyUserPlatformList = [];
        this.modifyUserSearchPlatformName = "";
        this.modifyingUser = false;
    }

    @action changeIsModifyUserDialog = (value) => {
        this.isModifyUserDialog = value;
        if(value) {
            this.getRoleList();
            this.getPlatformList();
        } else {
            this.initModifyDialog();
        }
    }

    @action filterPlatformList = () => {
        this.addUserPlatformIdList = [];
        if(this.addUserSearchPlatformName) {
            const filterPlatformList = this.addUserPlatformList.filter((item) => item.platformName.indexOf(this.addUserSearchPlatformName) !== -1);
            this.addUserPlatformList = filterPlatformList.length > 0 ? filterPlatformList : [];
        } else {
            this.getPlatformList();
        }
    }

    @action changeAddUserSearchPlatformName = (value) => {
        value = value ? value.trim() : value;
        this.addUserSearchPlatformName = value;
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
        if(this.addUserPlatformList.length === 0) {
            return null;
        }

        if(checked) {
            if(value === "all") {
                this.addUserPlatformIdList = [];
                this.addUserPlatformIdList.push("all");
                this.addUserPlatformList.forEach((item) => {
                    this.addUserPlatformIdList.push(item.platformId);
                });
            } else {
                this.addUserPlatformIdList.push(value);
            }
        } else {
            if(value === "all") {
                this.addUserPlatformIdList = [];
            } else {
                const delIdx = this.addUserPlatformIdList.findIndex((item) => item === value);
                if(delIdx !== -1) {
                    this.addUserPlatformIdList.splice(delIdx, 1);
                }
            }
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

    getUsers = flow(function* () {
        this.userList = [];
        try {
            const response = yield axios.get(`/api/v1/users`);
            this.userList = response.data;
            console.log(this.userList);
        } catch (err) {
            console.log('get Users error');
            console.log(err);
        }
    })

    addUser = flow(function* () {
        this.addingUser = true;
        try {
            const data = {
                userId: this.addUserId,
                userPwd: this.addUserPwd,
                userRoleId: this.addUserRoleId,
                userPlatformIdList: this.addUserPlatformIdList.filter((item) => item !== "all")
            }

            yield axios.post(`/api/v1/authentications/signUp`, data);
            this.addingUser = false;
            this.initAddDialog();
        } catch (err) {
            console.log('addUser');
            console.log(err);
            this.addingUser = false;
        }
    })
}
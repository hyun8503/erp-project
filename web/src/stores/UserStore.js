import {action, flow, observable} from "mobx";
import axios from "axios";
import RoleAdapter from "../adapter/RoleAdapter";
import PlatformAdapter from "../adapter/PlatformAdapter";
import * as ErrorType from "../type/ErrorType";

export default class UserStore {
    @observable isAddUserDialog = false;
    @observable addUserId = "";
    @observable addUserPwd = "";
    @observable addUserRoleId = "none";
    @observable addUserPlatformIdList = [];
    @observable addUserSearchPlatformName = "";
    @observable addingUser = false;

    @observable isModifyUserDialog = false;
    @observable modifyUserInfo = null;
    @observable modifyUserRoleId = "none";
    @observable modifyUserPlatformIdList = [];
    @observable modifyUserSearchPlatformName = "";
    @observable modifyingUser = false;
    @observable modifyUserPwd = "";

    @observable isDeleteDialog = false;
    @observable deletingUser = false;
    @observable deleteUserId = null;
//여
    @observable userRoleId = "none";
    @observable userPlatformId = "none";
    @observable userList = [];
    @observable platformList = [];
    @observable roleList = [];
    @observable userSearchPlatformName = "";
//
    @observable confirmDialogOpen = false;
    @observable confirmDialogMsg = "";

    @action initStore = () => {
        this.isAddUserDialog = false;
        this.confirmDialogOpen = false;
        this.confirmDialogMsg = "";
    }

    @action initAddDialog = () => {
        this.isAddUserDialog = false;
        this.addUserId = "";
        this.addUserPwd = "";
        this.addUserRoleId = "none";
        this.addUserPlatformIdList = [];
        this.addUserSearchPlatformName = "";
        this.addingUser = false;
    }

    @action initModifyDialog = () => {
        this.isModifyUserDialog = false;
        this.modifyUserRoleId = "none";
        this.modifyUserPlatformIdList = [];
        this.modifyUserSearchPlatformName = "";
        this.modifyingUser = false;
        this.modifyUserInfo = null;
        this.modifyUserPwd = "";
    }

    @action isDeleteDialogOpen = (userId) => {
        if(!userId) {
            return null;
        }

        this.deleteUserId = userId;
        this.isDeleteDialog = true;
    }

    @action isDeleteDialogClose = () => {
        this.deleteUserId = null;
        this.isDeleteDialog = false;
    }



    @action modifyFilterPlatformList = () => {
        if(this.modifyUserSearchPlatformName) {
            const filterPlatformList = this.platformList.filter((item) => item.platformName.indexOf(this.modifyUserSearchPlatformName) !== -1);
            this.platformList = filterPlatformList.length > 0 ? filterPlatformList : [];
        } else {
            this.getPlatformList();
        }
    }
///name
    @action changeModifyUserSearchPlatformName = (value) => {
        value = value ? value.trim() : value;
        this.modifyUserSearchPlatformName = value;
    }

    @action changeModifyUserPlatformIdList = (value, checked) => {
        if(this.platformList.length === 0) {
            return null;
        }

        if(checked) {
            if(value === "all") {
                this.modifyUserPlatformIdList = [];
                this.modifyUserPlatformIdList.push("all");
                this.platformList.forEach((item) => {
                    this.modifyUserPlatformIdList.push(item.platformId);
                });
            } else {
                this.modifyUserPlatformIdList.push(value);
            }
        } else {
            if(value === "all") {
                this.modifyUserPlatformIdList = [];
            } else {
                const delIdx = this.modifyUserPlatformIdList.findIndex((item) => item === value);
                if(delIdx !== -1) {
                    this.modifyUserPlatformIdList.splice(delIdx, 1);
                }
            }
        }
    }
//
    @action changeUserPlatformId = (value) => this.userPlatformId = value;

    @action changeUserRoleId = (value) => this.userRoleId = value;
//
    @action changeModifyUserRoleId = (value) => this.modifyUserRoleId = value;

    @action changeModifyUserPwd = (value) => {
        value = value ? value.trim() : value;
        this.modifyUserPwd = value;
    }

    @action modifyUserDialogOpen = (userId) => {
        this.isModifyUserDialog = true;
        this.getRoleList();
        this.getPlatformList();
        this.getModifyUser(userId);
    }

    @action modifyUserDialogClose = () => {
        this.initModifyDialog();
    }

    @action filterPlatformList = () => {
        this.addUserPlatformIdList = [];
        if(this.addUserSearchPlatformName) {
            const filterPlatformList = this.platformList.filter((item) => item.platformName.indexOf(this.addUserSearchPlatformName) !== -1);
            this.platformList = filterPlatformList.length > 0 ? filterPlatformList : [];
        } else {
            this.getPlatformList();
        }
    }

    @action changeAddUserSearchPlatformName = (value) => {
        value = value ? value.trim() : value;
        this.addUserSearchPlatformName = value;
    }

    //
    @action changeUserSearchPlatformName = (value) => {
        value = value ? value.trim() : value;
        this.userSearchPlatformName = value;
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
        if(this.platformList.length === 0) {
            return null;
        }

        if(checked) {
            if(value === "all") {
                this.addUserPlatformIdList = [];
                this.addUserPlatformIdList.push("all");
                this.platformList.forEach((item) => {
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
        this.roleList = [];
        const userRoleAdapter = new RoleAdapter();
        this.roleList = yield userRoleAdapter.getRoleList();
    });

    getPlatformList = flow(function* () {
        this.platformList = []
        const platformAdapter = new PlatformAdapter();
        this.platformList = yield platformAdapter.getPlatformList();
    });

    getUsers = flow(function* () {
        this.userList = [];
        try {
            const response = yield axios.get(`/api/v1/users`);
            this.userList = response.data;
        } catch (err) {
            console.log('get Users error');
            console.log(err);
        }
    });

    getModifyUser = flow(function* (userId) {
        this.modifyUserInfo = null;
        try {
            const response = yield axios.get(`/api/v1/user/${userId}`);
            this.modifyUserInfo = response.data;
            this.modifyUserRoleId = this.modifyUserInfo ? this.modifyUserInfo.role.roleId : "none";
            this.modifyUserPlatformIdList = this.modifyUserInfo ?
                this.modifyUserInfo.platform.map((item) => item.platformId)
                : [];
        } catch (err) {
            console.log('getModifyUser error');
            console.log(err);
            this.initModifyDialog();
        }
    });

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
            this.getUsers();
        } catch (err) {
            console.log('addUser');
            console.log(err);
            this.addingUser = false;
            if(err.response.data.code === ErrorType.code.LoginIdInUse) {
                this.confirmDialogMsg = "您输入的用户ID已经存在";
                this.confirmDialogOpen = true;
            }
        }
    })

    searchUser = flow(function* (){
        if (!this.userSearchPlatformName && this.userPlatformId === 'none' && this.userRoleId === 'none') {
            this.getUsers();
            return null;
        }

        this.userSearchPlatformName = this.userSearchPlatformName ? this.userSearchPlatformName : "none";
        this.userList = [];

        try {
            const response = yield axios.get(`/api/v1/user/${this.userPlatformId}/role/${this.userRoleId}/name/${this.userSearchPlatformName}`);
            this.userList = response.data;
            this.userSearchPlatformName = this.userSearchPlatformName === "none" ? "" : this.userSearchPlatformName;
        } catch (err) {
            console.log('search platform error');
            console.log(err);
            this.userSearchPlatformName = this.userSearchPlatformName === "none" ? "" : this.userSearchPlatformName;
        }





    })

    modifyPassword = flow(function* (data) {
        this.modifyingUser = true;
        try {
            const data = {password:this.modifyUserPwd}
            yield axios.put(`/api/v1/user/my-info`,data);
            this.getUsers();
        } catch (err) {
            console.log('modifyPassword error');
            console.log(err);
            this.modifyingUser = false;
        }
    })


    modifyUser = flow(function* () {
        this.modifyingUser = true;
        try {
            const data = {
                userId: this.modifyUserInfo.user.userId,
                userPwd: this.modifyUserPwd,
                userRoleId: this.modifyUserRoleId,
                userPlatformIdList: this.modifyUserPlatformIdList.filter((item) => item !== "all"),
            }

            yield axios.put(`/api/v1/user`, data);
            this.initModifyDialog();
            this.getUsers();
        } catch (err) {
            console.log('modifyUser error');
            console.log(err);
            this.modifyingUser = false;
        }
    })

    deleteUser = flow(function* () {
        this.deletingUser = true;
        try {
            yield axios.delete(`/api/v1/user/${this.deleteUserId}`);
            this.deletingUser = false;
            this.isDeleteDialogClose();
            this.getUsers();
        } catch (err) {
            console.log('delete user error');
            console.log(err);
            this.deletingUser = false;
        }
    });

    @action confirmDialogClose = () => {
        this.confirmDialogOpen = false;
    }

    @action confirmDialogHandle = () => {
        this.confirmDialogOpen = false;
        this.confirmDialogMsg = "";
    }
}
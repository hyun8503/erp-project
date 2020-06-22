import {action, flow, observable} from "mobx";
import axios from "axios";
import * as PlatformType from "../type/PlatformType";
import * as ErrorType from "../type/ErrorType";

export default class PlatformStore {
    @observable isAddPlatformDialog = false;
    @observable platformList = [];
    @observable platformListError = false;
    @observable addSelectedPlatformType = PlatformType.type.Direct;
    @observable addPlatformName = "";
    @observable addPlatformError = false;
    @observable addingPlatform = false;
    @observable searchName = "";
    @observable searchPlatformType = PlatformType.type.None;
    @observable confirmDialogOpen = false;
    @observable confirmDialogMsg = "";
    @observable deletePlatformError= false;

    @observable isDeleteDialog = false;
    @observable deletePlatformId = "";
    @observable deleting = false;


    @action initStore = () => {
        this.isAddPlatformDialog = false;
        this.platformList = [];
        this.platformListError = false;
        this.addSelectedPlatformType = PlatformType.type.Direct;
        this.addPlatformName = "";
        this.addPlatformError = false;
        this.addingPlatform = false;
        this.searchName = "";
        this.searchPlatformType = PlatformType.type.None;
        this.confirmDialogOpen = false;
        this.confirmDialogMsg = "";
        this.deletePlatformError= false;
    }


    @action initAddPlatformDialog = () => {
        this.isAddRoleDialog = false;
        this.platformName = '';
        this.searchPlatformType = PlatformType.type.None;

    }

    @action changeSearchName = (value) => {
        value = value ? value.trim() : value;
        this.searchName = value;
        console.log(value);
    }
    @action changeSearchPlatformType = (value) => {
        this.searchPlatformType = value;
        console.log(value);
    }
    @action changeIsAddPlatformDialog = (value) => this.isAddPlatformDialog = value;
    @action changeSelectedPlatformType = (value) => this.addSelectedPlatformType = value;
    @action changeAddPlatformName = (value) => {
        value = value ? value.trim() : value;
        this.addPlatformName = value
        console.log(value);
    };

    @action confirmDialogClose = () => {
        this.confirmDialogOpen = false;
    }

    @action confirmDialogHandle = () => {
        this.confirmDialogOpen = false;
        this.confirmDialogMsg = "";
    }







    updatePlatform = flow(function* (newData) {
        try {
            const response = yield axios.put(`/api/v1/platform`,  {
                platformId: newData.platformId,
                platformName: newData.platformName,
                typeCode: newData.typeCode,
            });

            this.getPlatformList();
            this.platformList = response.data;
        } catch (err) {
            console.log('updatePlatform');
            console.log(err);
           // this.updatePlatformError = true;
        }

    })




    deletePlatform = flow(function* (platformId) {
        this.deleting = true;
        console.log(this.deleting);
        try {
             const response = yield axios.delete(`/api/v1/platform/${platformId}`);
             this.getPlatformList();
        } catch (err) {
            console.log('deletePlatform');
            console.log(err);
            if(err.response.data.code === ErrorType.code.PlatformInUse) {
                this.confirmDialogMsg = "플랫이 이미 사용중입니다";
                this.confirmDialogOpen = true;
            } else {
                this.deletePlatformId = "";
                this.deleting = false;
            }
        }
    })

    getPlatformList = flow(function* () {
        this.platformList = [];
        try {
            const response = yield axios.get(`/api/v1/platforms`);
            this.platformList = response.data;
        } catch (err) {
            console.log('getPlatformList');
            console.log(err);
            this.platformListError = true;
            this.platformList = [];
        }
    });

    searchPlatform = flow(function* () {
        if (!this.searchName && !this.searchPlatformType) {
            return null;
        }
        this.platformList = [];
        try {
            const response = yield axios.get(`/api/v1/platform/${this.searchName}/type/${this.searchPlatformType}`);
            this.platformList = response.data;
        } catch (err) {
            console.log('search platform error');
            console.log(err);
        }
    });

    addPlatform = flow(function* () {
        this.addPlatformError = false;
        this.addingPlatform = true;
        try {
            const response = yield axios.post(`/api/v1/platform`, {
                platformName: this.addPlatformName,
                typeCode: this.addSelectedPlatformType,
            });

            this.addPlatformError = false;
            this.isAddPlatformDialog = false;
            this.addingPlatform = false;
            this.addPlatformName = "";
            this.getPlatformList();
        } catch (err) {
            console.log('addPlatform error');
            console.log(err);
            this.addingPlatform = false;
            if (err.response.data.code === ErrorType.code.PlatformNameDuplicate) {
                this.confirmDialogMsg = "플랫폼 이름이 이미 존재합니다";
                this.confirmDialogOpen = true;
                console.log(err.response.data.code);
            } else {
                this.initAddPlatformDialog();
            }
        }
    });
}

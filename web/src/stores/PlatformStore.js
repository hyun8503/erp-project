import {action, flow, observable} from "mobx";
import axios from "axios";
import * as PlatformType from "../type/PlatformType";

export default class PlatformStore {
    @observable isAddPlatformDialog = false;
    @observable platformList = null;
    @observable platformListError = false;
    @observable addSelectedPlatformType = PlatformType.type.Direct;
    @observable addPlatformName = "";
    @observable addPlatformError = false;
    @observable addingPlatform = false;

    @action initStore = () => {
        this.isAddPlatformDialog = false;
        this.platformList = null;
        this.platformListError = false;
        this.addSelectedPlatformType = PlatformType.type.Direct;
        this.addPlatformName = "";
        this.addPlatformError = false;
        this.addingPlatform = false;
    }
    @action changeIsAddPlatformDialog = (value) => this.isAddPlatformDialog = value;
    @action changeSelectedPlatformType = (value) => this.addSelectedPlatformType = value;
    @action changeAddPlatformName = (value) => {
        value = value ? value.trim() : value;
        this.addPlatformName = value
    };

    getPlatformList = flow(function* () {
        this.platformList = null;
        try {
            const response = yield axios.get(`/api/v1/platforms`);
            this.platformList = response.data;
        } catch (err) {
            console.log('getPlatformList');
            console.log(err);
            this.platformListError = true;
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
            this.addPlatformError = true;
            this.isAddPlatformDialog = false;
            this.addPlatformName = "";
            this.addingPlatform = false;
        }
    });
}
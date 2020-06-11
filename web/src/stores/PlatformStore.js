import {action, observable} from "mobx";


export default class PlatformStore {
    @observable isAddPlatformDialog = false;

    @action initStore = () => {
        this.isAddPlatformDialog = false;
    }

    @action changeIsAddPlatformDialog = (value) => this.isAddPlatformDialog = value;
}
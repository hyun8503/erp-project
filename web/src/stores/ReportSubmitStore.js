import {action, observable} from "mobx";


export default class ReportSubmitStore {
    @observable uploadFileList = [];
    @observable isCardListRender = false;

    @action initStore = () => {
        this.uploadFileList = [];
        this.isCardListRender = false;
    }

    @action changeUploadFileList = (files) => {
        this.uploadFileList = files;
        this.isCardListRender = false;
    };
    @action changeIsCardListRender = (value) => this.isCardListRender = value;
}
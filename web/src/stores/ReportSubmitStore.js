import {action, observable} from "mobx";

export default class ReportSubmitStore {
    @observable uploadFileList = [];
    @observable fileList = [];

    @action initStore = () => {
        this.uploadFileList = [];
        this.fileList = [];
    }

    @action changeUploadFileList = (files) => {
        this.uploadFileList = files;
    };

    @action addFileList = () => {
        this.fileList = this.fileList.concat(this.uploadFileList);
        this.uploadFileList = [];
    }

    @action changeIsCardListRender = (value) => this.isCardListRender = value;
}
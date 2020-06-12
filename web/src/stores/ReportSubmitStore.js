import {action, observable} from "mobx";

export default class ReportSubmitStore {
    @observable uploadFileList = [];
    @observable fileList = [];
    @observable isDropZoneAreaRender = true;

    @action initStore = () => {
        this.uploadFileList = [];
        this.fileList = [];
        this.isDropZoneAreaRender = true;
    }

    @action changeIsDropZoneAreaRender = (value) => this.isDropZoneAreaRender = value;
    @action changeUploadFileList = (files) => this.uploadFileList = files;

    @action addFileList = () => {
        this.fileList = this.fileList.concat(this.uploadFileList);
        this.uploadFileList = [];

        this.changeIsDropZoneAreaRender(false);
        setTimeout(() => this.changeIsDropZoneAreaRender(true), 500);
    }

    @action changeIsCardListRender = (value) => {
        this.isCardListRender = value
    };
}
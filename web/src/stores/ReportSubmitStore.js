import {action, flow, observable} from "mobx";
import axios from "axios";

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

    uploadFiles = flow(function* () {
        try {
            if(this.uploadFileList.length == 0) {
                return null;
            }

            const formData = new FormData();
            this.uploadFileList.forEach((item) => {
                formData.append("files", item);
            });

            yield axios.post(`/api/v1/report/template`, formData);
            this.uploadFileList = [];
            this.changeIsDropZoneAreaRender(false);
            setTimeout(() => this.changeIsDropZoneAreaRender(true), 500);
        } catch (err) {
            console.log('uploadFiles error');
            console.log(err);
        }
    });

    getTemplateList = flow(function* () {
        this.fileList = [];
        try {
            const response = yield axios.get(`/api/v1/report/template`);
            this.fileList = response.data;
        } catch (err) {
            console.log('getTemplateList error');
            console.log(err);
        }
    });
}
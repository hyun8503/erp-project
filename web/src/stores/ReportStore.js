import {action, flow, observable} from "mobx";
import axios from "axios";
import moment from "moment";

export default class ReportStore {
    @observable reportList = [];
    @observable fileWebViewLink = null;
    @observable fileWebViewId = null;
    @observable fileWebViewLoading = false;
    @observable fileWebViewReportId = null;

    @observable fileSaving = false;

    @observable selectedPlatformId = "none";
    @observable searchFileName = "";

    @observable platformList = [];

    @action initStore = () => {
        this.reportList = [];
        this.fileWebViewId = null;
        this.fileWebViewLink = null;
        this.fileWebViewLoading = false;
        this.selectedPlatformId = "none";
        this.searchFileName = "";
        this.platformList = [];
        this.fileWebViewReportId = null;
        this.fileSaving = false;
    }

    @action viewExcelClose = () => {
        this.fileWebViewId = null;
        this.fileWebViewLink = null;
        this.fileWebViewLoading = false;
    }

    @action changeSelectedPlatformId = (value) => this.selectedPlatformId = value;
    @action changeSearchFileName = (value) => {
        value = value ? value.trim() : value;
        this.searchFileName = value
    };

    getReportList = flow(function* () {
        this.reportList = [];
        try {
            const response = yield axios.get(`/api/v1/report`, {
                params: {
                    platformId: (this.selectedPlatformId === "none" || this.selectedPlatformId === "all") ? null : this.selectedPlatformId,
                    reportName: this.searchFileName === "" ? null : this.searchFileName,
                    reportMonth: moment().format("YYYYMM"),
                }
            });
            this.reportList = response.data;
        } catch (err) {
            console.log('getReportList error');
        }
    });

    getMyPlatformList = flow(function* () {
        this.platformList = [];
        try {
            const response = yield axios.get(`/api/v1/platforms-my`);
            this.platformList = response.data;
        } catch (err) {
            console.log('getPlatformList');
            console.log(err);
            this.platformListError = true;
            this.platformList = [];
        }
    });

    viewExcelProc = flow(function* (reportId) {
        this.fileWebViewLink = null;
        this.fileWebViewId = null;
        this.fileWebViewLoading = true;
        try {
            const response = yield axios.get(`/api/v1/gapi/check-credential`);
            if(response.data.authUrl) {
                alert("将进行Google认证，关闭弹窗后再试！");
                const authUrl = response.data.authUrl.replace('&redirect_uri', '&redirect_uri=' + response.data.redirectUri);
                window.open(authUrl);
            } else {
                const response = yield axios.get(`/api/v1/report/${reportId}/webviewlink`);
                this.fileWebViewLink = response.data.webViewLink;
                this.fileWebViewId = response.data.fileId;
                this.fileWebViewReportId = reportId;

                console.log(this.fileWebViewLink);
                console.log(this.fileWebViewId);
            }
            this.fileWebViewLoading = false;
        } catch (err) {
            console.log('viewExcelProc error');
            console.log(err);
            this.fileWebViewLoading = false;
        }
    });

    viewExcelSave = flow(function* () {
        this.fileSaving = true;
        try {
            yield axios.put(`/api/v1/report`, {
                reportId: this.fileWebViewReportId,
                fileId: this.fileWebViewId
            });

            this.fileSaving = false;
            this.fileWebViewLink = null;
            this.fileWebViewId = null;
            this.fileWebViewReportId = null;
            this.getReportList();
        } catch (err) {
            console.log('viewExcelSaveProc error');
            this.fileSaving = false;
        }
    });
}
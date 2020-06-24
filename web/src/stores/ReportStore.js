import {action, flow, observable} from "mobx";
import axios from "axios";
import moment from "moment";

export default class ReportStore {
    @observable reportList = [];
    @observable fileWebViewLink = null;
    @observable fileWebViewId = null;
    @observable fileWebViewLoading = false;

    @observable selectedPlatformId = "none";
    @observable searchFileName = "";

    @action initStore = () => {
        this.reportList = [];
        this.fileWebViewId = null;
        this.fileWebViewLink = null;
        this.fileWebViewLoading = false;
        this.selectedPlatformId = "none";
        this.searchFileName = "";
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

    viewExcelProc = flow(function* (reportId) {
        this.fileWebViewLink = null;
        this.fileWebViewId = null;
        this.fileWebViewLoading = true;
        try {
            const response = yield axios.get(`/api/v1/gapi/check-credential`);
            if(response.data.authUrl) {
                alert("구글 인증이 진행됩니다. 팝업창이 닫히면 다시 실행해 주세요");
                const authUrl = response.data.authUrl.replace('&redirect_uri', '&redirect_uri=' + response.data.redirectUri);
                window.open(authUrl);
            } else {
                const response = yield axios.get(`/api/v1/report/${reportId}/webviewlink`);
                this.fileWebViewLink = response.data.webViewLink;
                this.fileWebViewId = response.data.fileId;
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
}
import {action, observable} from "mobx";


export default class ReportStore {
    @observable reportList = [];

    @action initStore = () => {
        this.reportList = [];
    }
}
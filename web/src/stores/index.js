import {default as AuthStore} from "./AuthStore";
import ReportSubmitStore from "./ReportSubmitStore";
import PlatformStore from "./PlatformStore";

export const stores = {
    authStore:  new AuthStore(),
    reportSubmitStore: new ReportSubmitStore(),
    platformStore: new PlatformStore(),
};
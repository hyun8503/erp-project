import {default as AuthStore} from "./AuthStore";
import ReportSubmitStore from "./ReportSubmitStore";
import PlatformStore from "./PlatformStore";
import UserStore from "./UserStore";
import RoleStore from "./RoleStore";

export const stores = {
    authStore:  new AuthStore(),
    reportSubmitStore: new ReportSubmitStore(),
    platformStore: new PlatformStore(),
    userStore: new UserStore(),
    roleStore: new RoleStore(),
};
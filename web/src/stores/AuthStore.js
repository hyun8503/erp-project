import {action, flow, observable} from "mobx";
import axios from "axios";

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

export const LocalStorageTokenKey = '_BASKITOP_AUTHENTICATION_TOKEN_';


const EmptyLogin = {
    loginId: '',
    loginPassword: '',
};

const EmptyUser = {
    id: '',
    name: '',
    type: '',
    createdDatetime: '',
    updatedDatetime: '',
};


export default class AuthStore {
    @observable login = Object.assign({}, EmptyLogin);
    @observable loginState = State.NotAuthenticated;
    @observable loginToken = '';
    @observable loginUser = Object.assign({}, EmptyUser);
    @observable loginBtnDisabled = true;
    @observable myPermissionList = [];

    @action changeLoginId = (id) => {
        this.login.loginId = id;
    };

    @action changeLoginPassword = (password) => {
        this.login.loginPassword = password;
    };

    @action invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginToken = '';
        this.loginUser = Object.assign({}, EmptyUser);
    };

    getMyPermission = flow(function* (availablePermission) {
        this.myPermissionList = [];
        try {
            const response = yield axios.get(`/api/v1/permission`);
            this.myPermissionList = response.data;
            if(this.myPermissionList.length > 0 && availablePermission) {
                const idx = this.myPermissionList.findIndex((item) => item.permissionName === availablePermission);
                if(idx === -1) {
                    alert("你的账号没有权限");
                    this.doLogout();
                }
            }
        } catch (err) {
            console.log('getMyPermission error');
            console.log(err);
            this.myPermissionList = [];
        }
    });

    recaptchaAuth = flow(function* (token) {
        this.loginBtnDisabled = true;
        if(token) {
            this.loginBtnDisabled = false;
        }
        try {
            // const response = yield axios.post(`https://www.google.com/recaptcha/api/siteverify`, {
            //     secret: KEY.secret,
            //     response: token,
            // });
            // console.log(response);
        } catch (err) {
            console.log('recaptchaAuth err');
            console.log(err);
        }
    })

    doLogin = flow(function* doLogin(history) {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield axios.post('/api/v1/authentications/signin', param);
            const token = response.data.token;
            const user = response.data.user;    

            localStorage.setItem(LocalStorageTokenKey, token);

            console.log('doLogin');
            console.log(this);

            this.loginState = State.Authenticated;
            this.loginToken = token;
            this.loginUser = user;
            if(this.login.loginId === "admin") {
                history.push("/report/list");
            } else {
                history.push("/");
            }
        } catch (e) {
            this.loginState = State.Failed;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    });

    checkLogin = flow(function* checkLogin() {
        const token = localStorage.getItem(LocalStorageTokenKey);

        if(token) {
            try {
                const response = yield axios.get('/api/v1/authentications/signcheck');
                const user = response.data;

                this.loginState = State.Authenticated;
                this.loginUser = user;
            } catch(e) {
                this.loginState = State.NotAuthenticated;
                this.loginToken = '';
                this.loginUser = Object.assign({}, EmptyUser);
            }
        }
    });

    doLogout = flow(function* doLogout() {
        localStorage.removeItem(LocalStorageTokenKey);

        try {
            yield axios.post('/api/v1/authentications/signout');

            console.log(this);
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
            this.loginBtnDisabled = true;
        } catch(e) {
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
            this.loginBtnDisabled = true;
        }
    });
}
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";

import axios from "axios";

import TopBar from "./components/TopBar";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import PlatformManagement from "./views/management/platform/PlatformManagement";
import ReportManagement from "./views/management/report/ReportManagement";
import RoleManagement from "./views/management/role/RoleManagement";
import UserManagement from "./views/management/user/UserManagement";
import ReportSubmit from "./views/report/ReportSubmit";
import * as store from "./stores/AuthStore";
import Copyright from "./components/Copyright";


const style = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    }
});


@inject('authStore')
@observer
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
        };

        this.setMobileOpen = this.setMobileOpen.bind(this);
    }

    componentDidMount() {
        const axiosRequestInterceptors = (config) => {
            const token = localStorage.getItem(store.LocalStorageTokenKey);

            if(token) {
                config.headers['X-Auth-Token'] = token;
            }

            return config;
        };

        const axiosRequestErrorHandler = (error) => {
            return Promise.reject(error);
        };

        const axiosResponseInterceptor = (response) => {
            if(response.status === 403) {
                this.props.authStore.invalidateLogin();
            }

            return response;
        };

        const axiosResponseErrorHandler = (error) => {
            if((error.response) && (error.response.status === 403)) {
                this.props.authStore.invalidateLogin();
            }

            return Promise.reject(error);
        };

        console.log("========== RGate App componentDidMount ==========");
        axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
        axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

        this.props.authStore.checkLogin();
    }

    setMobileOpen(mobileOpen) {
        this.setState({mobileOpen: mobileOpen});
    }

    render() {
        const { classes } = this.props;
        const { loginState } = this.props.authStore;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Router>
                        <CssBaseline />

                        {/*<Route path="/" component={ScrollToTop}>*/}
                            <TopBar mobileOpen={this.state.mobileOpen}
                                    setMobileOpen={this.setMobileOpen}
                                    isLoggedIn={loginState === store.State.Authenticated}
                                    doLogout={() => this.props.authStore.doLogout()} />
                            {loginState === store.State.Authenticated ? (
                                <React.Fragment>
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/home" component={Home} />
                                        <Route exact path="/management/platform" component={PlatformManagement} />
                                        <Route exact path="/management/report" component={ReportManagement} />
                                        <Route exact path="/management/role" component={RoleManagement} />
                                        <Route exact path="/management/user" component={UserManagement} />
                                        <Route exact path="/report/submit" component={ReportSubmit} />
                                    </Switch>
                                </React.Fragment>
                            ) : (
                                <Route path="/" component={SignIn} />
                            )}
                      {/*</Route>*/}
                    </Router>
                    <Copyright/>
                </div>
            </React.Fragment>
        );
    }
};

export default withStyles(style) (App);

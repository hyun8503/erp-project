import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Paper, Typography} from "@material-ui/core";
import SideMenu from "../../components/SideMenu";
import Grid from "@material-ui/core/Grid";
import {inject, observer} from "mobx-react";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as PermissionType from "../../type/PermissionType";

const styles = theme => ({
    wrap: {
        display: 'flex',
        marginTop: '64px',
        width: '100%',
        height: '100%',
        minHeight: `calc(100vh - ${theme.footerHeight}px - 64px)`
    },
    mainContainer: {
        paddingLeft: `calc(${theme.drawerWidth}px + ${theme.spacing(3)}px)`,
        width: '100%',
        height: '100%',
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(3)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1200px',
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
    },
    cardGrid: {
        marginTop: theme.spacing(2),
    },
    cardMedia: {
        alignItems: "center",
        backgroundSize: "contain",
        //width: '100%',
        height: '140px',
    }
});

@inject("authStore", "reportStore", "platformStore")
@observer
class ReportList extends React.Component {
    componentDidMount() {
        this.props.authStore.getMyPermission(PermissionType.type.ReportSearch);
        this.props.reportStore.getReportList();
        this.props.reportStore.getMyPlatformList();
    }

    componentWillUnmount() {
        this.props.reportStore.initStore();
    }

    render() {
        const { classes } = this.props;

        const renderFileWebView = () => {
            return (
                <React.Fragment>
                    <Grid item xs={12} style={{display: "flex"}}>
                        <iframe src={this.props.reportStore.fileWebViewLink ? this.props.reportStore.fileWebViewLink : ""}
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    minHeight: '700px'
                                }}
                        >
                        </iframe>
                    </Grid>
                </React.Fragment>
            );
        }

        const renderList = () => {
            return (
                <React.Fragment>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                select
                                variant={"outlined"}
                                defaultValue={"none"}
                                value={this.props.reportStore.selectedPlatformId}
                                onChange={(event) => this.props.reportStore.changeSelectedPlatformId(event.target.value)}
                                fullWidth
                            >
                                <MenuItem value="none" disabled>
                                    <em>平台类型</em>
                                </MenuItem>
                                <MenuItem value={"all"}>全部类型</MenuItem>
                                {this.props.reportStore.platformList.length > 0 ?
                                    this.props.reportStore.platformList.map((item) => {
                                        return (
                                            <MenuItem key={item.platformId} value={item.platformId}>{item.platformName}</MenuItem>
                                        )
                                    })
                                    : ""}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={"查询报表"}
                                variant={"outlined"}
                                value={this.props.reportStore.searchFileName}
                                onChange={(event) => this.props.reportStore.changeSearchFileName(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid container item xs={12} sm={3} alignItems={"center"}>
                            <Button variant={"contained"} color={"primary"} size={"large"} onClick={() => this.props.reportStore.getReportList()}>查询</Button>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.cardGrid} spacing={3}>
                        {this.props.reportStore.reportList.length > 0 ?
                            this.props.reportStore.reportList.map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.reportId} style={{minWidth: '170px'}}>
                                        <Card>
                                            <CardActionArea onClick={() => this.props.reportStore.viewExcelProc(item.reportId)}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={"/images/excel.png"}
                                                    title={"hoho"}
                                                />
                                                <CardContent>
                                                    <Typography variant={"subtitle1"}>
                                                        {moment(item.reportMonth).format("YYYY年 MM月") + "-" + item.platformName + "-" + item.reportName.substr(0, item.reportName.lastIndexOf("."))}
                                                    </Typography>
                                                    <Typography variant={"body2"}>
                                                        上传日期: {moment(item.reportMonth).format("YYYY-MM")}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })
                            :
                            ""
                        }
                    </Grid>
                </React.Fragment>
            );
        }

        return (
            <div className={classes.wrap}>
                <Backdrop open={this.props.reportStore.fileWebViewLoading}
                          style={{zIndex: 10000}}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <SideMenu
                    mobileOpen = {false}
                    setMobileOpen = {() => {}}
                    isLoggedIn = {true}
                    doLogout = {() => this.props.authStore.doLogout()}
                    myPermissionList = {this.props.authStore.myPermissionList}
                />
                <div className={classes.appBarSpacer} />
                <Grid className={classes.mainContainer} container justify={"center"}>
                    <Paper className={classes.mainContent}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2">
                                查询报表
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} style={{marginTop: '16px'}}>
                            <Grid item xs={10}>
                                <Typography variant="h6" gutterBottom>
                                    目前日期: {moment().format("YYYY-MM-DD")}
                                </Typography>
                            </Grid>

                            <Grid item xs={2} align={"right"}>
                                {this.props.reportStore.fileWebViewLink ?
                                    <Button variant={"contained"} color={"primary"} onClick={() => this.props.reportStore.viewExcelClose()}>关闭</Button>
                                    : ""
                                }
                            </Grid>
                        </Grid>
                        {this.props.reportStore.fileWebViewLink ? renderFileWebView() : renderList()}
                    </Paper>
                </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ReportList)));
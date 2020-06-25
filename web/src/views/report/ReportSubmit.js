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
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
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
            paddingLeft: 0
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
    toolbar: {
        width: '100%',
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

@inject("authStore", "reportStore")
@observer
class ReportSubmit extends React.Component {
    componentDidMount() {
        this.props.authStore.getMyPermission(PermissionType.type.ReportSubmit);
        this.props.reportStore.getReportList();
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
                    <Grid container className={classes.cardGrid} spacing={3}>
                        {this.props.reportStore.reportList.length > 0 ?
                            this.props.reportStore.reportList.map((item, index) => {
                                return (
                                    <Grid item xs={3} key={item.reportId}>
                                        <Card>
                                            <CardActionArea onClick={() => this.props.reportStore.viewExcelProc(item.reportId)}>
                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={"/images/excel.png"}
                                                    title={"hoho"}
                                                />
                                                <CardContent>
                                                    <Typography variant={"subtitle1"}>
                                                        {moment(item.reportMonth).format("YYYY-MM") + " " + item.reportName}
                                                    </Typography>
                                                    <Typography variant={"body2"}>
                                                        上传日期: {moment(item.modifiedDate).format("YYYY-MM-DD HH:mm:ss")}
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
            )
        }

        return (
            <div className={classes.wrap}>
                <Backdrop open={this.props.reportStore.fileWebViewLoading || this.props.reportStore.fileSaving}
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
                                提交报表
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
                                    <Button variant={"contained"} color={"primary"} onClick={() => this.props.reportStore.viewExcelSave()}>储蓄</Button>
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

export default withSnackbar(withRouter(withStyles(styles) (ReportSubmit)));
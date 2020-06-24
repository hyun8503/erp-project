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
                                                        업데이트: {moment(item.modifiedDate).format("YYYY-MM-DD HH:mm:ss")}
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
                />
                <div className={classes.appBarSpacer} />
                <Grid className={classes.mainContainer} container justify={"center"}>
                    <Paper className={classes.mainContent}>
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2">
                                레포트 제출
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: '16px'}}>
                            <Typography variant="h6" gutterBottom>
                                현재 날짜: {moment().format("YYYY-MM-DD")}
                            </Typography>
                        </Grid>
                        {this.props.reportStore.fileWebViewLink ? renderFileWebView() : renderList()}
                    </Paper>
                </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ReportSubmit)));
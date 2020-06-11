import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Paper, Typography} from "@material-ui/core";
import SideMenu from "../../components/SideMenu";
import Grid from "@material-ui/core/Grid";
import {inject, observer} from "mobx-react";
import {DropzoneArea} from "material-ui-dropzone";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';

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

@inject("authStore", "reportSubmitStore")
@observer
class ReportSubmit extends React.Component {
    componentDidMount() {
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
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
                        <Grid item xs={12}>
                            <DropzoneArea
                                onChange={(files) => this.props.reportSubmitStore.changeUploadFileList(files)}
                                showFileNamesInPreview={true}
                                showPreviews={true}
                                showPreviewsInDropzone={false}
                                previewGridProps={{item: {xs: 2}}}
                            />
                        </Grid>

                        {this.props.reportSubmitStore.uploadFileList.length > 0 ?
                            <Grid container item xs={12} justify={"flex-end"} spacing={1} style={{marginTop: '8px'}}>
                                {/*<Grid item>*/}
                                {/*    <Button variant={"contained"} color={"secondary"}>취소</Button>*/}
                                {/*</Grid>*/}
                                <Grid item>
                                    <Button variant={"contained"} color={"primary"} onClick={() => this.props.reportSubmitStore.changeIsCardListRender(true)}>등록</Button>
                                </Grid>
                            </Grid>
                            : ""}

                        <Grid container className={classes.cardGrid} spacing={3}>
                            {this.props.reportSubmitStore.isCardListRender && this.props.reportSubmitStore.uploadFileList.length > 0 ?
                                this.props.reportSubmitStore.uploadFileList.map((item, index) => {
                                    return (
                                        <Grid item xs={3} key={"upload-file"+index}>
                                            <Card>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.cardMedia}
                                                        image={"/images/excel.png"}
                                                        title={"hoho"}
                                                    />
                                                    <CardContent>
                                                        <Typography variant={"subtitle1"}>
                                                            {item.name}
                                                        </Typography>
                                                        <Typography variant={"body2"}>
                                                            업데이트: {moment(item.lastModified).format("YYYY-MM-DD")}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })
                                : ""}
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ReportSubmit)));
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
class ReportList extends React.Component {
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
                                레포트 검색
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: '16px'}}>
                            <Typography variant="h6" gutterBottom>
                                현재 날짜: {moment().format("YYYY-MM-DD")}
                            </Typography>
                        </Grid>

                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    select
                                    label={"플랫폼 선택"}
                                    variant={"outlined"}
                                    defaultValue={"all"}
                                    fullWidth
                                >
                                    <MenuItem value={"all"}>전체</MenuItem>
                                    <MenuItem value={"1"}>플랫폼1</MenuItem>
                                    <MenuItem value={"2"}>플랫폼2</MenuItem>
                                    <MenuItem value={"3"}>플랫폼3</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={"파일명 검색"}
                                    variant={"outlined"}
                                    fullWidth
                                />
                            </Grid>
                            <Grid container item xs={12} sm={3} alignItems={"center"}>
                                <Button variant={"contained"} color={"primary"} size={"large"}>검색</Button>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.cardGrid} spacing={3}>
                            <Grid item xs={3}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={"/images/excel.png"}
                                            title={"hoho"}
                                        />
                                        <CardContent>
                                            <Typography variant={"subtitle1"}>
                                                test1
                                            </Typography>
                                            <Typography variant={"body2"}>
                                                업데이트: {moment().format("YYYY-MM-DD")}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                            {this.props.reportSubmitStore.uploadFileList.length > 0 ?
                                this.props.reportSubmitStore.uploadFileList.map((item, index) => {
                                    return (
                                        <Grid item xs={3}>
                                            <Card key={"upload-file"+index}>
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
                                :
                                ""
                                // <Grid item xs={12}>
                                //     <Typography variant={"h6"} align={"center"}>
                                //         레포트가 없습니다.
                                //     </Typography>
                                // </Grid>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ReportList)));
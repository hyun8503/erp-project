import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Paper, Typography} from "@material-ui/core";
import SideMenu from "../../components/SideMenu";
import Grid from "@material-ui/core/Grid";
import {inject, observer} from "mobx-react";
import {DropzoneArea} from "material-ui-dropzone";


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
});

@inject("authStore")
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
                            <DropzoneArea
                                onChange={(files) => console.log(files)}
                                showFileNamesInPreview={true}
                                showPreviews={true}
                                showPreviewsInDropzone={false}
                                previewGridProps={{item: {xs: 2}}}
                                //previewGridProps={{container: {'component': 'div'}, item: {'component': 'div'}}}
                                //previewGridClasses={{container: "testPreView"}}
                            />
                        </Grid>
                        <Grid container className={"testPreView"}>

                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ReportSubmit)));
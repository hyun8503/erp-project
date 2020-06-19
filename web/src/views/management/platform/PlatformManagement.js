import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Paper, Select, TextField, Typography} from "@material-ui/core";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import SideMenu from "../../../components/SideMenu";
import {inject, observer} from "mobx-react";

import AddPlatformDialog from "./dialog/AddPlatformDialog";
import * as PlatformType from "../../../type/PlatformType";
import ConfirmDialog from "../../../components/ConfirmDialog";

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
    materialTable: {
        boxShadow: 'none',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },

    button: {
        marginTop: theme.spacing(2),
        margin: theme.spacing(1),
    },
    hidden: {
        display: 'none'
    }


});



@inject("authStore", "platformStore")
@observer
class PlatformManagement extends React.Component {
    componentDidMount() {
        this.props.platformStore.getPlatformList();
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
                                플랫폼 관리
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl
                                    style={{width: 200}}
                                    variant="outlined" className={classes.formControl}>
                                    <Select
                                        defaultValue={"none"}
                                        value={this.props.platformStore.searchPlatformType}
                                        onChange={(event)=>{this.props.platformStore.changeSearchPlatformType(event.target.value)}}>
                                        <MenuItem value={PlatformType.type.None} disabled><em>플랫폼 유형</em></MenuItem>
                                        <MenuItem value={PlatformType.type.Direct}>직영</MenuItem>
                                        <MenuItem value={PlatformType.type.NonDirect}>비직영</MenuItem>
                                    </Select>
                                </FormControl>


                                <FormControl className={classes.formControl}
                                             noValidate
                                             autoComplete="off"
                                >
                                    <TextField
                                        style={{width: 400}}
                                        id="outlined-basic"
                                        label="플랫폼 이름"
                                        variant="outlined"
                                        value={this.props.platformStore.searchName}
                                        onChange={(event) => this.props.platformStore.changeSearchName(event.target.value)}
                                    />
                                </FormControl>

                                <Button className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.props.platformStore.searchPlatform()}
                                >
                                    검색
                                </Button>
                                <Button className={classes.button}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.props.platformStore.changeIsAddPlatformDialog(true)}>
                                    등록
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <MaterialTable
                                style={{marginTop: '16px', boxShadow: 'none'}}
                                options={{
                                    search: false,
                                    showTitle: false,
                                    toolbar: false,
                                    actionsColumnIndex: -1,
                                    pageSize: 10,
                                    pageSizeOptions: [5, 10, 15, 20, 25, 30, 40, 50],
                                    headerStyle: {
                                        backgroundColor: '#fafafa',
                                        color: 'rgba(51, 51, 51, 0.56)',
                                        borderTop: '1px solid #eee',
                                        padding: 8,
                                    }
                                }}
                                localization={{
                                    header: {
                                        actions: '',
                                    },
                                    body: {
                                        emptyDataSourceMessage: '데이터가 없습니다',
                                    },
                                    pagination: {
                                        labelRowsSelect: ' 개씩 보기',
                                        labelDisplayedRows: '총 {count}개 중 {from} - {to}',
                                    },
                                }}
                                columns={[
                                    {title: '플랫폼 이름', field: 'platformName'},
                                    {
                                        title: '플랫폼 유형', field: 'typeCode',
                                        lookup: {[PlatformType.type.Direct]: '직영', [PlatformType.type.NonDirect]: '비직영'},
                                    },
                                ]}
                                data={
                                    !!this.props.platformStore.platformList ?
                                        this.props.platformStore.platformList.map((item) => {
                                            return {
                                                platformId: item.platformId,
                                                platformName: item.platformName,
                                                typeCode: item.typeCode,
                                            }
                                        }) : []
                                }
                                editable={{
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                                console.log(newData);
                                                console.log(oldData);
                                                this.props.platformStore.updatePlatform(newData);
                                                resolve();
                                        }),
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            console.log(oldData);
                                            this.props.platformStore.deletePlatform(oldData.platformId);
                                            resolve();
                                        }),
                                }}
                            />

                        </Grid>
                    </Paper>
                </Grid>

                <ConfirmDialog
                    open={this.props.platformStore.confirmDialogOpen}
                    handleClose={this.props.platformStore.confirmDialogClose}
                    handleConfirm={this.props.platformStore.confirmDialogHandle}
                    message={this.props.platformStore.confirmDialogMsg}
                />
                <AddPlatformDialog/>
            </div>
        );
    }
};


export default withSnackbar(withRouter(withStyles(styles) (PlatformManagement)));
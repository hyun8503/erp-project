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
import AddUserDialog from "./dialog/AddUserDialog";
import ModifyUserDialog from "./dialog/ModifyUserDialog";
import DeleteDialog from "./dialog/DeleteDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";
import * as PermissionType from "../../../type/PermissionType";


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
});



@inject("authStore", "userStore")
 @observer
class UserManagement extends React.Component {
  
    componentDidMount() {
        this.props.authStore.getMyPermission(PermissionType.type.UserManagement);
        this.props.userStore.getUsers();
        this.props.userStore.getRoleList();
        this.props.userStore.getPlatformList();
    }

    componentWillUnmount() {
        this.props.userStore.initStore();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrap}>
                <SideMenu
                    mobileOpen={false}
                    setMobileOpen={() => {
                    }}
                    isLoggedIn={true}
                    doLogout={() => this.props.authStore.doLogout()}
                    myPermissionList = {this.props.authStore.myPermissionList}
                />
                <div className={classes.appBarSpacer}/>
                <Grid className={classes.mainContainer} container justify={"center"}>
                    <Paper className={classes.mainContent}>
                        <Grid container item xs={12}>
                            <Typography variant="h4" component="h2">
                                用户管理
                            </Typography>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        value={this.props.userStore.roleList.length > 0 ? this.props.userStore.userRoleId : "none"}
                                        onChange={(event) => this.props.userStore.changeUserRoleId(event.target.value)
                                        }>
                                        <MenuItem value="none">
                                            <em>选择角色</em>
                                        </MenuItem>
                                        {this.props.userStore.roleList.length > 0 ?
                                            this.props.userStore.roleList.map((item) => {
                                                return (
                                                    <MenuItem key={item.role.roleId} value={item.role.roleId}>{item.role.roleName}</MenuItem>
                                                )
                                            })
                                            : ""}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        value={this.props.userStore.platformList.length > 0 ? this.props.userStore.userPlatformId : "none"}
                                        onChange={(event) => this.props.userStore.changeUserPlatformId(event.target.value)
                                        }>
                                        <MenuItem value="none">
                                            <em>平台</em>
                                        </MenuItem>
                                        {this.props.userStore.platformList.length > 0 ?
                                            this.props.userStore.platformList.map((item) => {
                                                return (
                                                    <MenuItem key={item.platformId} value={item.platformId}>{item.platformName}</MenuItem>
                                                )
                                            })
                                            : ""}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl noValidate autoComplete="off" fullWidth>
                                    <TextField
                                        id="outlined-basic"
                                        label="用户ID"
                                        variant="outlined"
                                        value={this.props.userStore.userSearchPlatformName}
                                        onChange={(event) => {this.props.userStore.changeUserSearchPlatformName(event.target.value)}}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid container item xs={12} sm={12} md={3} alignItems={"center"} justify={"flex-start"}>
                                <Button variant="contained"
                                        color="primary"
                                        onClick = {()=>this.props.userStore.searchUser()}
                                >
                                    查询
                                </Button>
                                <Button style={{marginLeft: '8px'}}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.props.userStore.changeIsAddUserDialog(true)}>
                                    新增
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <MaterialTable
                                style={{marginTop: '16px', boxShadow: 'none'}}
                                options={{
                                    search: false,
                                    showTitle: false,
                                    toolbar: false, actionsColumnIndex: -1,
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
                                        emptyDataSourceMessage: '对不起，没有数据',
                                    },
                                    pagination: {
                                        labelRowsSelect: ' 个项目',
                                        labelDisplayedRows: '总 {count}个项目中 {from} - {to}',
                                    },
                                }}
                                columns={[
                                    {title: '用户ID', field: 'loginId'},
                                    {
                                        title: '角色',
                                        field: 'roleName',
                                    },

                                ]}
                                data={this.props.userStore.userList.length > 0 ?
                                    this.props.userStore.userList.map((item) => {
                                        return {
                                            userId: item.userId,
                                            loginId: item.loginId,
                                            roleName: item.roleName,
                                        }
                                    })
                                    : []}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'update user',
                                        onClick: (event, rowData) => this.props.userStore.modifyUserDialogOpen(rowData.userId)
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'delete user',
                                        onClick: (event, rowData) => this.props.userStore.isDeleteDialogOpen(rowData.userId)
                                    }
                                ]}
                            />

                        </Grid>
                    </Paper>
                </Grid>
                <AddUserDialog/>
                <ModifyUserDialog/>
                <DeleteDialog/>
                <ConfirmDialog
                    open={this.props.userStore.confirmDialogOpen}
                    handleClose={this.props.userStore.confirmDialogClose}
                    handleConfirm={this.props.userStore.confirmDialogHandle}
                    message={this.props.userStore.confirmDialogMsg}
                />
            </div>
        );
    }
};


export default withSnackbar(withRouter(withStyles(styles) (UserManagement)));
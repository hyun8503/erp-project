import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Paper, TextField, Typography} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import SideMenu from "../../../components/SideMenu";
import {inject, observer} from "mobx-react";
import AddRoleDialog from "./dialog/AddRoleDialog";
import ModifyRoleDialog from "./dialog/ModifyRoleDialog";
import ConfirmDialog from "../../../components/ConfirmDialog";
import DeleteDialog from "./dialog/DeleteDialog";
import Chip from '@material-ui/core/Chip';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
      },
      selectEmpty: {
        marginTop: theme.spacing(1),
      },

      button:{
        marginTop: theme.spacing(2),
        margin: theme.spacing(1),
    },
    hidden: {
        display: 'none'
        },
        root: {
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          icon: {
            borderRadius: 3,
            width: 16,
            height: 16,
            boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
            backgroundColor: '#f5f8fa',
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
            '$root.Mui-focusVisible &': {
              outline: '2px auto rgba(19,124,189,.6)',
              outlineOffset: 2,
            },
            'input:hover ~ &': {
              backgroundColor: '#ebf1f5',
            },
            'input:disabled ~ &': {
              boxShadow: 'none',
              background: 'rgba(206,217,224,.5)',
            },
          },
          checkedIcon: {
            backgroundColor: '#137cbd',
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
            '&:before': {
              display: 'block',
              width: 16,
              height: 16,
              backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
              content: '""',
            },
            'input:hover ~ &': {
              backgroundColor: '#106ba3',
            },
          },

});



@inject("authStore", "roleStore")
@observer
class RoleManagement extends React.Component {

    componentDidMount() {
        this.props.authStore.getMyPermission(PermissionType.type.RoleManagement);
        this.props.roleStore.getRoleList();
    }

    componentWillUnmount() {
        this.props.roleStore.initStore();
    }

    render() {
        const { classes } = this.props;
        const getPermissionNameText = {
            [PermissionType.type.PlatformManagement]: "平台管理",
            [PermissionType.type.ReportSearch]: "查询报表",
            [PermissionType.type.ReportSubmit]: "提交报表",
            [PermissionType.type.ReportTemplate]: "报表模版管理",
            [PermissionType.type.RoleManagement]: "角色管理",
            [PermissionType.type.UserManagement]: "用户管理",
        }

        return (
            <div className={classes.wrap}>
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
                                角色管理
                            </Typography>
                        </Grid>


                        <Grid container spacing={1} alignItems={"center"}>
                            <Grid item xs={12} sm={6}>
                                <FormControl noValidate autoComplete="off" fullWidth>
                                    <TextField
                                        id="outlined-basic"
                                        label="角色名称"
                                        variant="outlined"
                                        value={this.props.roleStore.searchRoleName}
                                        onChange={(event) => this.props.roleStore.changeSearchRoleName(event.target.value)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Button variant="contained" color="primary" onClick={() => this.props.roleStore.searchRoleList()}>查询</Button>
                                <Button style={{marginLeft: '8px'}}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.props.roleStore.changeIsAddRoleDialog(true)}>
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
                                    {
                                        title: '角色名称',
                                        field: 'roleName',
                                        cellStyle: {minWidth: '150px'}},
                                    {
                                        title: '权限',
                                        //field: 'roleList',
                                        cellStyle: {minWidth: '800px'},
                                        render: rowData => {
                                            return rowData.permissionList.map((item) => <Chip key={item.permissionId} style={{marginRight: '4px'}} variant="outlined" size="small" color="primary" label={getPermissionNameText[item.permissionName]}/>)
                                        },
                                        editComponent: props => {
                                            //return props.rowData.roleList.map(item => <Chip key={Math.random().toString()} style={{marginRight: '4px'}} clickable variant="outlined" size="small" color="primary" label={item} onDelete={() => {}} />)
                                        }
                                    }
                                ]}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'update role',
                                        onClick: (event, rowData) => this.props.roleStore.getUpdateRole(rowData.roleId)
                                    },
                                    {
                                        icon: 'delete',
                                        tooltip: 'delete role',
                                        onClick: (event, rowData) => this.props.roleStore.deleteDialogOpen(rowData.roleId)
                                    }
                                ]}
                                data={this.props.roleStore.roleList.length > 0 ? this.props.roleStore.roleList.map((item) => {
                                    return {
                                        roleId: item.role.roleId,
                                        roleName: item.role.roleName,
                                        permissionList: item.permissionList,
                                    }
                                }) : []}
                            />
                        </Grid>
                    </Paper>
                  </Grid>
                <AddRoleDialog/>
                <ModifyRoleDialog/>
                <ConfirmDialog
                    open={this.props.roleStore.confirmDialogOpen}
                    handleClose={this.props.roleStore.confirmDialogClose}
                    handleConfirm={this.props.roleStore.confirmDialogHandle}
                    message={this.props.roleStore.confirmDialogMsg}
                />
                <DeleteDialog/>
            </div>
        );
    }
};


export default withSnackbar(withRouter(withStyles(styles) (RoleManagement)));
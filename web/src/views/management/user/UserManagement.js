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
});



@inject("authStore", "userStore")
 @observer
class UserManagement extends React.Component {
  
    componentDidMount() {
        this.props.userStore.getUsers();
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
                />
                <div className={classes.appBarSpacer}/>
                <Grid className={classes.mainContainer} container justify={"center"}>
                    <Paper className={classes.mainContent}>
                        <Grid container item xs={12}>
                            <Typography variant="h4" component="h2">
                                사용자 관리
                            </Typography>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        defaultValue="none"
                                        onChange={() => {
                                        }}>
                                        <MenuItem value="none" disabled>
                                            <em>역할 유형</em>
                                        </MenuItem>
                                        <MenuItem value={"직영"}>역할1</MenuItem>
                                        <MenuItem value={"비직영"}>역할2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        defaultValue="none"
                                        onChange={() => {
                                        }}>
                                        <MenuItem value="none" disabled>
                                            <em>플랫폼</em>
                                        </MenuItem>
                                        <MenuItem value={"역할1"}>플랫폼1</MenuItem>
                                        <MenuItem value={"역할2"}>플랫폼2</MenuItem>
                                        <MenuItem value={"역할3"}>플랫폼3</MenuItem>
                                        <MenuItem value={"역할4"}>플랫폼4</MenuItem>
                                        <MenuItem value={"역할5"}>플랫폼5</MenuItem>
                                        <MenuItem value={"역할6"}>플랫폼6</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl noValidate autoComplete="off" fullWidth>
                                    <TextField id="outlined-basic" label="사용자 ID" variant="outlined"/>
                                </FormControl>
                            </Grid>
                            <Grid container item xs={12} sm={12} md={3} alignItems={"center"} justify={"flex-start"}>
                                <Button variant="contained" color="primary">검색</Button>
                                <Button style={{marginLeft: '8px'}}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.props.userStore.changeIsAddUserDialog(true)}>
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
                                        emptyDataSourceMessage: '데이터가 없습니다',
                                    },
                                    pagination: {
                                        labelRowsSelect: ' 개씩 보기',
                                        labelDisplayedRows: '총 {count}개 중 {from} - {to}',
                                    },
                                }}
                                columns={[
                                    {title: '사용자 ID', field: 'loginId'},
                                    {
                                        title: '역할',
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
            </div>
        );
    }
};


export default withSnackbar(withRouter(withStyles(styles) (UserManagement)));
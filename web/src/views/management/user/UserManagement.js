import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Paper, Typography, Button, TextField, Select} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import SideMenu from "../../../components/SideMenu";
import {inject, observer} from "mobx-react";
import AddUserDialog from "./dialog/AddUserDialog";


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
      textField: {
        margin: theme.spacing(1),
      },
      button:{
        marginTop: theme.spacing(2),
        margin: theme.spacing(1),
    },    

});



@inject("authStore", "userStore")
 @observer
class UserManagement extends React.Component {
  
    componentDidMount() {
    }
     

    render() {
        const { classes } = this.props;
      
        const tableDummyData = [
            {platformName: '사용자1', platformType: '플랫폼1', status: '1'},
            {platformName: '사용자2', platformType: '플랫폼1', status: '2'},
            {platformName: '사용자3', platformType: '플랫폼1', status: '3'},
            {platformName: '사용자4', platformType: '플랫폼1', status: '4'},
            {platformName: '사용자5', platformType: '플랫폼1', status: '5'},
            {platformName: '사용자6', platformType: '플랫폼2', status: '6'},
            {platformName: '사용자7', platformType: '플랫폼2', status: '2'},
            {platformName: '사용자8', platformType: '플랫폼2', status: '2'},
            {platformName: '사용자9', platformType: '플랫폼2', status: '2'},
            {platformName: '사용자10', platformType: '플랫폼2', status: '2'}
        ]

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
                                사용자 관리
                            </Typography>
                        </Grid>


                     <Grid container spacing={3}>
                        <Grid item xs={12}>
                           <FormControl 
                             style={{width:200}}
                             variant="outlined" className={classes.formControl}>
                               <Select
                                 defaultValue="none"
                                 onChange={()=>{}}>
                                    <MenuItem value="none" disabled>
                                    <em>플랫폼 유형</em>
                                    </MenuItem>
                                    <MenuItem value={"직영"}>직영</MenuItem>
                                    <MenuItem value={"비직영"}>비직영</MenuItem>
                                </Select>
                           </FormControl> 

                           <FormControl 
                             style={{width:200}}
                             variant="outlined" className={classes.formControl}>
                               <Select
                                 defaultValue="none"
                                 onChange={()=>{}}>
                                    <MenuItem value="none" disabled>
                                    <em>역할 유형</em>
                                    </MenuItem>
                                    <MenuItem value={"보고서제출"}>보고서제출</MenuItem>
                                    <MenuItem value={"보고서검색"}>보고서검색</MenuItem>
                                    <MenuItem value={"보고서형식"}>보고서형식</MenuItem>
                                    <MenuItem value={"플랫폼관리"}>플랫폼관리</MenuItem>
                                    <MenuItem value={"사용자관리"}>사용자관리</MenuItem>
                                    <MenuItem value={"역할 관리"}>역할 관리</MenuItem>
                                </Select>
                           </FormControl> 



                            <FormControl className={classes.formControl} noValidate autoComplete="off">
                                 <TextField 
                                 style={{width:400}}
                                 id="outlined-basic" label="사용자 이름" variant="outlined" />
                            </FormControl>

                            <Button className={classes.button} variant="contained" color="primary" >검색</Button>
                            <Button className={classes.button}
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
                                   toolbar: false,actionsColumnIndex: -1,
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
                                    {title: '사용자 ID', field: 'platformName'},
                                    {
                                        title: '소속 플랫폼', field: 'platformType',
                                        lookup: { '플랫폼1': '플랫폼1', '플랫폼2': '플랫폼2' },
                                      },
                                    {
                                        title: '역할',
                                        field: 'status',
                                        lookup: { '1': '보고서제출', '2': '보고서검색', '3': '보고서형식', '4': '플랫폼관리','5': '사용자관리', '6': '역할 관리' },
                                      },
                               
                                ]}
                            data={tableDummyData}
                               editable={{
                                onRowUpdate: (newData, oldData) => 
                                 new Promise((resolve, reject) => {                       
                                    resolve();                           
                                }),
                                onRowDelete: oldData =>
                                 new Promise((resolve, reject) => {                              
                                    resolve()
                                }),
                            }}
                            />
                       
                      </Grid>
                    </Paper>
                </Grid>
                <AddUserDialog/>
            </div>
        );
    }
};


export default withSnackbar(withRouter(withStyles(styles) (UserManagement)));
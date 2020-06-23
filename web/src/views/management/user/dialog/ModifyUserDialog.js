import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Select, TextField} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from "@material-ui/core/Grid";


const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    textField: {
        margin: theme.spacing(1),
      },
      select: {
        margin: theme.spacing(1),
      },
      formGroup: {
        marginTop: theme.spacing(2),
      },
      container: {
        justifyContent: 'center',

      },
    
});

@inject("userStore")
@observer
class ModifyUserDialog extends React.Component {
    componentDidMount() {
        
    }

    render() {
        const {classes} = this.props;
        const addBtnDisabled = !(this.props.userStore.modifyUserPlatformIdList.length > 0 && this.props.userStore.modifyUserRoleId && !this.props.userStore.modifyingUser);

        return (
            <Dialog 
                open={this.props.userStore.isModifyUserDialog}
                onClose={() => this.props.userStore.modifyUserDialogClose()}
                disableBackdropClick={false}
                disableEscapeKeyDown={false}
            >
                <DialogTitle>사용자 수정</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField id="userId"
                                               disabled
                                               label="사용자 ID"
                                               variant="outlined"
                                               value={this.props.userStore.modifyUserInfo ? this.props.userStore.modifyUserInfo.user.loginId : ""}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl noValidate autoComplete="off" fullWidth>
                                    <TextField id="password"
                                               label="비밀번호 재설정"
                                               type={"password"}
                                               variant="outlined"
                                               value={this.props.userStore.modifyUserPwd}
                                               onChange={(event) => this.props.userStore.changeModifyUserPwd(event.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth>
                                    <Select
                                        value={this.props.userStore.roleList.length > 0 ? this.props.userStore.modifyUserRoleId : "none"}
                                        onChange={(event) => this.props.userStore.changeModifyUserRoleId(event.target.value)}
                                    >
                                        <MenuItem value="none" disabled>
                                            <em>역할</em>
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
                        </Grid>

                        <FormGroup style={{border: '1px solid gray'}} className={classes.formGroup}>
                            <FormControl className={classes.formControl} noValidate autoComplete="off">
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <TextField variant={"outlined"}
                                                   fullWidth
                                                   label={"플랫폼 이름"}
                                                   value={this.props.userStore.modifyUserSearchPlatformName}
                                                   onChange={(event) => this.props.userStore.changeModifyUserSearchPlatformName(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid container item xs={4} alignItems={"center"} justify={"flex-start"}>
                                        <Button variant={"contained"} color={"primary"} onClick={() => this.props.userStore.modifyFilterPlatformList()} >검색</Button>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12}>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="start"
                                            control={
                                                <Checkbox color="primary"
                                                          checked={this.props.userStore.modifyUserPlatformIdList.findIndex((value) => value === "all") !== -1}
                                                          onChange={(event) => this.props.userStore.changeModifyUserPlatformIdList("all", event.target.checked)}
                                                />
                                            }
                                            label="전체선택"
                                            labelPlacement="end"
                                        />
                                        {this.props.userStore.platformList.length > 0 ?
                                            this.props.userStore.platformList.map((item) => {
                                                return (
                                                    <FormControlLabel
                                                        key={item.platformId}
                                                        value="start"
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={this.props.userStore.modifyUserPlatformIdList.findIndex((value) => value === item.platformId) !== -1}
                                                                onChange={(event) => this.props.userStore.changeModifyUserPlatformIdList(item.platformId, event.target.checked)}
                                                                value={item.platformId}
                                                            />
                                                        }
                                                        label={item.platformName}
                                                        labelPlacement="end"
                                                    />
                                                )
                                            })
                                            : ""}
                                    </FormGroup>
                                </Grid>
                            </FormControl>
                        </FormGroup>
                    </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" disabled={addBtnDisabled} onClick={() => {}}>수정</Button>
                    <Button variant="outlined" color="primary"
                            onClick={() => this.props.userStore.modifyUserDialogClose()}> 닫기</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ModifyUserDialog);

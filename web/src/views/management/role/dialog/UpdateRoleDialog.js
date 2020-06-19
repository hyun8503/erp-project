import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, TextField} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import * as PermissionType from "../../../../type/PermissionType";

const styles = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
});

@inject("roleStore")
@observer
class UpdateRoleDialog extends React.Component {
    componentDidMount() {
        
    }

    render() {
        const {classes} = this.props;
        const addBtnDisabled = !(this.props.roleStore.updateDialogPermissionList.length > 0 && this.props.roleStore.updateDialogRoleName);

        return (
            <Dialog open={this.props.roleStore.isUpdateDialog}
                    onClose={() => this.props.roleStore.changeIsUpdateDialog(false)}>
                <DialogTitle>권한관리</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="역할 이름" variant="outlined" value={this.props.roleStore.updateDialogRoleName} onChange={(event) => this.props.roleStore.changeUpdateDialogRoleName(event.target.value)} />
                        <Container className={classes.container}>
                            <FormGroup row >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name={PermissionType.type.ReportSubmit}
                                            checked={this.props.roleStore.updateDialogPermissionList.findIndex((item) => item === PermissionType.type.ReportSubmit) !== -1}
                                            onChange={(event) => this.props.roleStore.addUpdateRoleList(event.target.name, event.target.checked)}
                                        />
                                    }
                                    label={"보고서 제출"}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name={PermissionType.type.ReportSearch}
                                            checked={this.props.roleStore.updateDialogPermissionList.findIndex((item) => item === PermissionType.type.ReportSearch) !== -1}
                                            onChange={(event) => this.props.roleStore.addUpdateRoleList(event.target.name, event.target.checked)}
                                        />
                                    }
                                    label="보고서검색"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name={PermissionType.type.ReportTemplate}
                                            checked={this.props.roleStore.updateDialogPermissionList.findIndex((item) => item === PermissionType.type.ReportTemplate) !== -1}
                                            onChange={(event) => this.props.roleStore.addUpdateRoleList(event.target.name, event.target.checked)}
                                        />
                                    }
                                    label="보고서형식"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name={PermissionType.type.PlatformManagement}
                                            checked={this.props.roleStore.updateDialogPermissionList.findIndex((item) => item === PermissionType.type.PlatformManagement) !== -1}
                                            onChange={(event) => this.props.roleStore.addUpdateRoleList(event.target.name, event.target.checked)}
                                        />
                                    }
                                    label="플랫폼관리"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name={PermissionType.type.UserManagement}
                                            checked={this.props.roleStore.updateDialogPermissionList.findIndex((item) => item === PermissionType.type.UserManagement) !== -1}
                                            onChange={(event) => this.props.roleStore.addUpdateRoleList(event.target.name, event.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="사용자관리"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name={PermissionType.type.RoleManagement}
                                            checked={this.props.roleStore.updateDialogPermissionList.findIndex((item) => item === PermissionType.type.RoleManagement) !== -1}
                                            onChange={(event) => this.props.roleStore.addUpdateRoleList(event.target.name, event.target.checked)}
                                        />
                                    }
                                    label="역할 관리"
                                    labelPlacement="end"
                                />
                            </FormGroup>
                        </Container>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" disabled={addBtnDisabled} onClick={() => this.props.roleStore.updateRole()}>수정</Button>
                    <Button variant="outlined" color="primary"
                            onClick={() => this.props.roleStore.changeIsUpdateDialog(false)}>닫기</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(UpdateRoleDialog);

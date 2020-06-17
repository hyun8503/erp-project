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
class AddRoleDialog extends React.Component {
    componentDidMount() {
        
    }

    render() {
        const {classes} = this.props;
        const addBtnDisabled = !(this.props.roleStore.addRoleList.length > 0 && this.props.roleStore.roleName);

        return (
        <Dialog open={this.props.roleStore.isAddRoleDialog} 
                onClose={() => this.props.roleStore.changeIsAddRoleDialog(false)}>        
            <DialogTitle>권한관리</DialogTitle>
            <DialogContent>                                                         
                <FormControl className={classes.formControl} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="역할 이름" variant="outlined" value={this.props.roleStore.roleName} onChange={(event) => this.props.roleStore.changeRoleName(event.target.value)} />
                    <Container className={classes.container}>
                        <FormGroup row >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        name={PermissionType.type.ReportSubmit}
                                        checked={this.props.roleStore.addRoleCheckList[PermissionType.type.ReportSubmit]}
                                        onChange={(event) => this.props.roleStore.changeAddRoleCheckList(event.target.name, event.target.checked)}
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
                                        checked={this.props.roleStore.addRoleCheckList[PermissionType.type.ReportSearch]}
                                        onChange={(event) => this.props.roleStore.changeAddRoleCheckList(event.target.name, event.target.checked)}
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
                                        checked={this.props.roleStore.addRoleCheckList[PermissionType.type.ReportTemplate]}
                                        onChange={(event) => this.props.roleStore.changeAddRoleCheckList(event.target.name, event.target.checked)}
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
                                        checked={this.props.roleStore.addRoleCheckList[PermissionType.type.PlatformManagement]}
                                        onChange={(event) => this.props.roleStore.changeAddRoleCheckList(event.target.name, event.target.checked)}
                                    />
                                }
                                label="플랫폼관리"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={PermissionType.type.UserManagement}
                                        checked={this.props.roleStore.addRoleCheckList[PermissionType.type.UserManagement]}
                                        onChange={(event) => this.props.roleStore.changeAddRoleCheckList(event.target.name, event.target.checked)}
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
                                        checked={this.props.roleStore.addRoleCheckList[PermissionType.type.RoleManagement]}
                                        onChange={(event) => this.props.roleStore.changeAddRoleCheckList(event.target.name, event.target.checked)}
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
                <Button variant="contained" color="primary" disabled={addBtnDisabled}>추가</Button>
                <Button variant="outlined" color="primary" 
                        onClick={() => this.props.roleStore.changeIsAddRoleDialog(false)}>닫기</Button>
            </DialogActions>
        </Dialog>

        )
    }
}

export default withStyles(styles)(AddRoleDialog);

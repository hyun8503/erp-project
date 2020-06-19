import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Button, DialogActions, DialogContent, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";

@inject("roleStore")
@observer
class DeleteDialog extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <Dialog open={this.props.roleStore.isDeleteDialog}
                    onClose={() => this.props.roleStore.deleteDialogClose()}
                    fullWidth={true}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    maxWidth={'xs'} >
                <DialogContent>
                    <Typography variant="subtitle1" component="h2">
                        정말 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.roleStore.deleteDialogClose()}>
                        취소
                    </Button>
                    <Button color={"primary"} onClick={() => this.props.roleStore.deleteDialogConfirmHandle()}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteDialog;
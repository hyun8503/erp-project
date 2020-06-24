import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Button, DialogActions, DialogContent, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";

@inject("userStore")
@observer
class DeleteDialog extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <Dialog open={this.props.userStore.isDeleteDialog}
                    onClose={() => this.props.userStore.isDeleteDialogClose()}
                    fullWidth={true}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    maxWidth={'xs'} >
                <DialogContent>
                    <Typography variant="subtitle1" component="h2">
                        确定要删除吗？
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.userStore.isDeleteDialogClose()} disabled={this.props.userStore.deletingUser}>
                        取消
                    </Button>
                    <Button color={"primary"} onClick={() => this.props.userStore.deleteUser()} disabled={this.props.userStore.deletingUser}>
                        确定
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteDialog;
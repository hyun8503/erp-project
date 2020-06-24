import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import {Button, DialogActions, DialogContent, Typography} from "@material-ui/core";

export default function ConfirmDialog(props) {
    const { open, handleClose, handleConfirm, message} = props;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} disableBackdropClick={true} disableEscapeKeyDown={true} maxWidth={'xs'} >
            <DialogContent>
                <Typography variant="subtitle1" component="h2">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleConfirm()}>
                    确定
                </Button>
            </DialogActions>
        </Dialog>
    );
}
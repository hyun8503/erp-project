import React from "react";
import {withStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import {Button, Select, TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {inject, observer} from "mobx-react";

const styles = (theme) => ({
    formControl: {
        //   autoWidth : true,
        margin: theme.spacing(1),
        minWidth: 100,
    },
});

@inject("platformStore")
@observer
class AddPlatformDialog extends React.Component {
    componentDidMount() {
        this.props.platformStore.initStore();
        this.props.platformStore.changeIsAddPlatformDialog(true);
    }

    render() {
        const {classes} = this.props;

        return (
            <Dialog open={this.props.platformStore.isAddPlatformDialog} onClose={() => this.props.platformStore.changeIsAddPlatformDialog(false)}>
                <DialogTitle>플랫폼 추가</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            defaultValue={"none"}
                            onChange={(event) => {}}>
                            {/* 여기 상태 고치기 */}

                            <MenuItem value="none" disabled>
                                <em>플랫폼 유형</em>
                            </MenuItem>
                            <MenuItem value={"직영"}>직영</MenuItem>
                            <MenuItem value={"비직영"}>비직영</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="플랫폼 이름" variant="outlined"/>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary">추가</Button>
                    <Button variant="outlined"
                            color="primary"
                            onClick={() => this.props.platformStore.changeIsAddPlatformDialog(false)}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(AddPlatformDialog);

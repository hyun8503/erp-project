import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, TextField, Container} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';


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

        return (
        <Dialog open={this.props.roleStore.isAddRoleDialog} 
                onClose={() => this.props.roleStore.changeIsAddRoleDialog(false)}>        
            <DialogTitle>권한관리</DialogTitle>
            <DialogContent>                                                         
                <FormControl className={classes.formControl} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="역할 이름" variant="outlined" />
                <Container className={classes.container}>
                  <FormGroup row>
                    <FormControlLabel
                        value="보고서제출"
                        control={<Checkbox color="primary" />}
                        label="보고서제출"
                        labelPlacement="end"
                    />
                    <FormControlLabel
                        value="보고서검색"
                        control={<Checkbox color="primary" />}
                        label="보고서검색"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="보고서형식"
                        control={<Checkbox color="primary" />}
                        label="보고서형식"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="플랫폼관리"
                        control={<Checkbox color="primary" />}
                        label="플랫폼관리"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="사용자관리"
                        control={<Checkbox color="primary" />}
                        label="사용자관리"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="역할 관리"
                        control={<Checkbox color="primary" />}
                        label="역할 관리"
                        labelPlacement="end"
                        />
                    </FormGroup>
                    </Container>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary">추가</Button>
                <Button variant="outlined" color="primary" 
                        onClick={() => this.props.roleStore.changeIsAddRoleDialog(false)}>닫기</Button>
            </DialogActions>
        </Dialog>

        )
    }
}

export default withStyles(styles)(AddRoleDialog);

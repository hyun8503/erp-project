import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, Select, TextField, Container} from "@material-ui/core";
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
class AddUserDialog extends React.Component {
    componentDidMount() {
        
    }

    render() {
        const {classes} = this.props;

        return (
            <Dialog 
                open={this.props.userStore.isAddUserDialog} 
                onClose={() => this.props.userStore.changeIsAddUserDialog(false)}>   
                <DialogTitle>사용자 추가</DialogTitle>
                    <DialogContent> 
                        <FormControl className={classes.formControl}>
                            <TextField style={{width:530}} id="outlined-basic" label="사용자 ID" variant="outlined" />
                        </FormControl>

                        <FormControl style={{width:530}} className={classes.formControl} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="비밀번호" 
                            labelPlacement="start" variant="outlined" />
                        </FormControl>  

                        <FormControl variant="outlined" className={classes.formControl}>   
                            <Select
                                style={{width:530}} 
                                defaultValue={"none"}
                                onChange={() => {}}>
                                <MenuItem value="none" disabled>
                                 <em>플랫폼 유형</em>
                                 </MenuItem>
                                 <MenuItem value={"직영"}>직영</MenuItem>
                                <MenuItem value={"비직영"}>비직영</MenuItem>
                             </Select>
                        </FormControl> 
                                 
                                        <FormGroup style={{border:'1px solid gray'}} className={classes.formGroup}>
                                          <FormControl className={classes.formControl} noValidate autoComplete="off">   
                                            <FormControl 
                                                style={{display: 'inline-block'}}
                                                className={classes.formControl}
                                                variant="outlined">
                                                <Select
                                                className={classes.select}
                                                defaultValue={"none"}
                                                onChange={() => {}}>
                                                    <MenuItem value="none" disabled>
                                                    <em>역할 유형</em>
                                                    </MenuItem>
                                                    <MenuItem value={"직영"}>직영</MenuItem>
                                                    <MenuItem value={"비직영"}>비직영</MenuItem>
                                                </Select>
                                               <TextField className={classes.textField} id="outlined-basic" label="사용자 이름" variant="outlined" />
                                                <Button className={classes.button} variant="contained" color="primary" >검색</Button>
                                          </FormControl>
                                          <Container className={classes.container}>
                                          <FormGroup aria-label="position" row>
                                                <FormControlLabel
                                                    value="start"
                                                    control={<Checkbox color="primary" />}
                                                    label="보고서제출"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="start"
                                                    control={<Checkbox color="primary" />}
                                                    label="보고서검색"
                                                    labelPlacement="end"
                                                    />
                                                <FormControlLabel
                                                    value="start"
                                                    control={<Checkbox color="primary" />}
                                                    label="보고서형식"
                                                    labelPlacement="end"
                                                    />
                                                <FormControlLabel
                                                    value="start"
                                                    control={<Checkbox color="primary" />}
                                                    label="플랫폼관리"
                                                    labelPlacement="end"
                                                    />
                                                <FormControlLabel
                                                    value="start"
                                                    control={<Checkbox color="primary" />}
                                                    label="사용자관리"
                                                    labelPlacement="end"
                                                    />
                                                <FormControlLabel
                                                    value="start"
                                                    control={<Checkbox color="primary" />}
                                                    label="역할 관리"
                                                    labelPlacement="end"
                                                    />
                                            </FormGroup>
                                            </Container>
                                        </FormControl>
                                        </FormGroup>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="contained" color="primary">추가</Button>
                                        <Button variant="outlined" color="primary" 
                                        onClick={() => this.props.userStore.changeIsAddUserDialog(false)}> 닫기</Button>
                                    </DialogActions>
                                </Dialog>

        )
    }
}

export default withStyles(styles)(AddUserDialog);

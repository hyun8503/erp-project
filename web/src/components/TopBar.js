import React from "react";
import {Link} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar, Button,
    IconButton,
    List,
    ListItem,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

const logoWidth = 120;

const useStyles = makeStyles((theme) => ({
    appBar: {
        // [theme.breakpoints.up('sm')]: {
        //     width: `calc(100% - ${theme.drawerWidth}px)`,
        //     marginLeft: theme.drawerWidth,
        // },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        marginLeft: (theme.sideMenuWidth - logoWidth) / 2,
        paddingLeft: theme.spacing(3),
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    accountInfo: {
    },
}));


export default function TopBar(props) {
    const classes = useStyles();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, userPasswordModifyHandle, userPasswordChange } = props;
    const [open, setOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if(!isLoggedIn) {
        return (
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        <Link to='/' className={classes.link}>
                            ERP Solution
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }else{
        return (
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        <Link to='/' className={classes.link}>
                            ERP Solution
                        </Link>
                    </Typography>

                    <IconButton
                        className={classes.accountInfo}
                        color="inherit"
                        aria-label="account of current user"
                        edge="end"
                        aria-haspopup="true"
                        onClick={handleClickOpen}
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                            密码更改
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>

                                    <FormControl noValidate autoComplete="off" fullWidth>
                                        <TextField id="password"
                                                   label="密码"
                                                   type={"password"}
                                                   variant="outlined"
                                                   onChange={(event) => {userPasswordChange(event.target.value)}}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={userPasswordModifyHandle}
                            >确定
                            </Button>
                            <Button className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleClose}
                            >关闭
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <List>
                        <ListItem button onClick={() => doLogout()}>
                            <ExitToAppIcon/>
                        </ListItem>
                    </List>

                </Toolbar>
            </AppBar>
        );
    }
}



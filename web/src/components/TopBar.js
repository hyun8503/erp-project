import React from "react";
import {Link, NavLink} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Button, IconButton, List, ListItem, TextField, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Menu from "@material-ui/core/Menu";
import * as PermissionType from "../type/PermissionType";
import MenuItem from "@material-ui/core/MenuItem";

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
        [theme.breakpoints.up('md')]: {
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, userPasswordModifyHandle, userPasswordChange, myPermissionList } = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submitAndChange = () => {
        userPasswordModifyHandle();
        handleClose();
    };

    const getMenuCheck = (permission) => {
        if(myPermissionList.length > 0) {
            const idx = myPermissionList.findIndex((item) => item.permissionName === permission);
            if(idx !== -1) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    const drawer = (
        <div>
            {getMenuCheck(PermissionType.type.ReportSubmit) ?
                <NavLink to="/report/submit" className={classes.link}>
                    <MenuItem>提交报表</MenuItem>
                </NavLink>
                : ""}
            {getMenuCheck(PermissionType.type.ReportSearch) ?
                <NavLink to={"/report/list"} className={classes.link}>
                    <MenuItem>查询报表</MenuItem>
                </NavLink>
                : ""}
            {getMenuCheck(PermissionType.type.ReportTemplate) ?
                <NavLink to="/management/report" className={classes.link}>
                    <MenuItem>报表模版管理</MenuItem>
                </NavLink>
                : ""}
            {getMenuCheck(PermissionType.type.PlatformManagement) ?
                <NavLink to="/management/platform" className={classes.link}>
                    <MenuItem>平台管理</MenuItem>
                </NavLink>
                : ""}
            {getMenuCheck(PermissionType.type.RoleManagement) ?
                <NavLink to="/management/role" className={classes.link}>
                    <MenuItem>角色管理</MenuItem>
                </NavLink>
                : ""}
            {getMenuCheck(PermissionType.type.UserManagement) ?
                <NavLink to="/management/user" className={classes.link}>
                    <MenuItem>用户管理</MenuItem>
                </NavLink>
                : ""}
        </div>
    );


    if(!isLoggedIn) {
        return (
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
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
                        onClick={(event) => setAnchorEl(event.currentTarget)}
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
                        fullWidth={fullWidth}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="draggable-dialog-title"
                        disableBackdropClick={false}
                        disableEscapeKeyDown={false}
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
                                    onClick={submitAndChange}
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
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    {drawer}
                </Menu>
            </AppBar>
        );
    }
}



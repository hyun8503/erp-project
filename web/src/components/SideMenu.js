import React from "react";
import {NavLink} from "react-router-dom";
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import * as PermissionType from "../type/PermissionType";

import {
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar
} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const logoWidth = 129;
const logoHeight = 22;

const useStyles = makeStyles((theme) => ({
    appBar: {
        width: theme.drawerWidth,
        paddingLeft: 0,
        paddingRight: 0,
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        marginTop: '64px',
        width: theme.drawerWidth,
        height: '100%',
        border: 'none',
    },
    toolbar: {
        width: theme.drawerWidth,
        backgroundColor: theme.palette.primary.main,
        paddingLeft: 0,
        paddingRight: 0,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    logo: {
        width: logoWidth,
        height: logoHeight,
        marginLeft: (theme.drawerWidth - logoWidth) / 2,
        marginRight: (theme.drawerWidth - logoWidth) / 2,
    },
    menu: {
        borderRight: '1px solid rgba(0,0,0,0.12)',
        height: '100%',
    },

    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

export default function SideMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, myPermissionList } = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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
        <div className={classes.menu}>
            <List>
                <ListSubheader inset>报告管理</ListSubheader>
                {getMenuCheck(PermissionType.type.ReportSubmit) ?
                    <NavLink to="/report/submit" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><PostAddIcon /></ListItemIcon>
                            <ListItemText primary="提交报表" />
                        </ListItem>
                    </NavLink>
                    : ""}
                {getMenuCheck(PermissionType.type.ReportSearch) ?
                    <NavLink to={"/report/list"} className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><FindInPageIcon /></ListItemIcon>
                            <ListItemText primary="查询报表" />
                        </ListItem>
                    </NavLink>
                    : ""}
            </List>
            <Divider />
            <List>
                <ListSubheader inset>系统管理</ListSubheader>
                {getMenuCheck(PermissionType.type.ReportTemplate) ?
                    <NavLink to="/management/report" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="报表模版管理" />
                        </ListItem>
                    </NavLink>
                    : ""}
                {getMenuCheck(PermissionType.type.PlatformManagement) ?
                    <NavLink to="/management/platform" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="平台管理" />
                        </ListItem>
                    </NavLink>
                    : ""}
                {getMenuCheck(PermissionType.type.RoleManagement) ?
                    <NavLink to="/management/role" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="角色管理" />
                        </ListItem>
                    </NavLink>
                    : ""}
                {getMenuCheck(PermissionType.type.UserManagement) ?
                    <NavLink to="/management/user" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="用户管理" />
                        </ListItem>
                    </NavLink>
                    : ""}
            </List>
            {/*<Divider />*/}
            {/*<List>*/}
            {/*    <ListItem button onClick={() => doLogout()}>*/}
            {/*        <ListItemIcon><ExitToAppIcon /></ListItemIcon>*/}
            {/*        <ListItemText primary="登出" />*/}
            {/*    </ListItem>*/}
            {/*</List>*/}
        </div>
    );

    return (
        <React.Fragment>
            <Hidden mdUp implementation="css">
                <Drawer variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                >
                    <Toolbar className={classes.toolbar}>
                        {/*<Link to='/' className={classes.link}>*/}
                        {/*    <img src="/images/aether_white.png" alt="AetherIT" className={classes.logo}/>*/}
                        {/*</Link>*/}
                    </Toolbar>
                    {isLoggedIn ? (
                        drawer
                    ) : (
                        ''
                    )}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}

                        open
                >
                    {isLoggedIn ? (
                        drawer
                    ) : (
                        ''
                    )}
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
};
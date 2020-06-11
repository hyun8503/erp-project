import React from "react";
import {NavLink} from "react-router-dom";

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
import ComputerIcon from '@material-ui/icons/Computer';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout } = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className={classes.menu}>
            <List>
                <ListSubheader inset>레포트</ListSubheader>

                <NavLink to="/report/submit" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="레포트 제출" />
                    </ListItem>
                </NavLink>
                <NavLink to={"/report/list"} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="레포트 검색" />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <ListSubheader inset>시스템 관리</ListSubheader>

                <NavLink to="/management/report" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="보고서 템플릿 관리" />
                    </ListItem>
                </NavLink>
                <NavLink to="/management/platform" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="플랫폼 관리" />
                    </ListItem>
                </NavLink>
                <NavLink to="/management/role" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="역할 관리" />
                    </ListItem>
                </NavLink>
                <NavLink to="/management/user" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="사용자 관리" />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => doLogout()}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="로그아웃" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <Hidden smUp implementation="css">
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
            <Hidden xsDown implementation="css">
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
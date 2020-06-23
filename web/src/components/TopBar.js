import React from "react";
import {Link} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout } = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                    <Link to='/' className={classes.link}>
                        ERP Solution
                    </Link>
                </Typography>


                {/*로그인 했을 때 보이고, 로그아웃 했을 때 안 보이도록*/}
                {/*정보 수정 아이콘*/}
                <IconButton
                    className={classes.accountInfo}
                    color="inherit"
                    aria-label="account of current user"
                    edge="end"
                    aria-haspopup="true"
                >
                    <AccountCircle />
                </IconButton>

                {/*로그아웃 아이콘*/}
                <List>
                    <ListItem button onClick={() => doLogout()}>
                        <ExitToAppIcon />
                    </ListItem>
                </List>




            </Toolbar>
        </AppBar>
    );
}
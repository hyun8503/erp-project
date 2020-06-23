import React from "react";
import {Link, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        //display: 'flex',
        width: '100%',
        height: theme.footerHeight,
        backgroundColor: '#fff',
        bottom: '0',
        zIndex: 1210
    }
}));

export default function Copyright() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="http://www.aetherit.io">
                    Sind Tech
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {configure} from "mobx";
import {Provider as MobxProvider} from "mobx-react";
import {ThemeProvider} from "@material-ui/core/styles";
import {SnackbarProvider} from "notistack";
import {stores} from "./stores";
import configureTheme from "./configureTheme";

configure({enforceActions: "always"});

const theme = configureTheme();

ReactDOM.render(
    <MobxProvider {...stores}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <App />
            </SnackbarProvider>
        </ThemeProvider>
    </MobxProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

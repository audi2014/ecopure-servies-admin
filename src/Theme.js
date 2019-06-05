import React from "react";

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

import lightGreen from '@material-ui/core/colors/lightGreen';

export const primary = '#8bc34a';

export const theme = createMuiTheme({
    overrides: {},
    palette: {
        primary:lightGreen,
    },
});


export const withTheme = Component => (props) => {
    return <ThemeProvider theme={theme}>
        <Component {...props}/>
    </ThemeProvider>

};



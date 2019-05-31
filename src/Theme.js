import {createMuiTheme} from "@material-ui/core";
import primaryColor from "@material-ui/core/colors/lightGreen";

export const Theme = createMuiTheme({
    overrides: {
        // MuiTableCell: {
        //     head: {
        //         color: '#fff',
        //     },
        //     body: {
        //         color: '#fff',
        //     },
        // },
    },
    palette: {
        primary: primaryColor,
        // type: 'dark',
    },
});
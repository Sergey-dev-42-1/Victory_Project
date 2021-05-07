import {Theme} from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import {cyan, deepOrange} from "@material-ui/core/colors";
export const defaultTheme = createMuiTheme({
    palette:{
        primary:{
            main:"#ff7043",
            dark:"#c63f17",
            light:"#ffa270"
        },
        secondary:{
            main:"#128395",
            dark:"#096371",
            light:"#22b8c9"
        }
    }
})
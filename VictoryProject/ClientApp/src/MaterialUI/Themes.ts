import { createMuiTheme } from '@material-ui/core/styles';
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
export const darkTheme = createMuiTheme({
    palette:{
        primary:{
            main:"#323232",
            dark:"#000000",
            light:"#4c4c4c"
        },
        secondary:{
            main:"#323232",
            dark:"#000000",
            light:"#4c4c4c"
        }
    }
})
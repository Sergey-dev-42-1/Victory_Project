import { createMuiTheme } from '@material-ui/core/styles';
import { DataGrid, ruRU } from '@material-ui/data-grid';
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
    },
    
},ruRU,)
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
},ruRU,)
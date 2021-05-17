import {createMuiTheme} from '@material-ui/core/styles';
import {ruRU} from '@material-ui/data-grid';

export const defaultTheme = createMuiTheme({
    palette:{
        primary:{
            main:"#db4518",

        },
        secondary:{
            main:"#0da8ba",

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
        },
        background:{
            paper: "#eaeaea"
        }
    }
},ruRU,)
import React, {useState} from "react";

import {Link as RouterLink} from "@reach/router";

import {AppBar, Toolbar, IconButton, Button, Typography, Link, Drawer, Dialog} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/';

import {useDispatch, useSelector} from "react-redux";
import {toggle, selectSidebarOpen, selectSidebarShow} from "../state/sidebarSlice";
import {dark, selectDarkTheme} from "../state/themeSlice";
import {selectHeaderHide} from "../state/headerSlice";

import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import {LogInForm} from "../Forms/LogInForm";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: "sticky",
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        "&:visited": {
            color: "inherit",

        },
        "&:hover": {
            textDecoration: 'none',
        }
    }
}));


//TODO: Опираться на то, авторизован пользователь или нет при показе полей
export const Header = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    const hideHeader = useSelector(selectHeaderHide);
    const opened = useSelector(selectSidebarOpen);
    const shown = useSelector(selectSidebarShow);
    const darkTheme = useSelector(selectDarkTheme);
    const [logIn, setLogIn] = useState(false);

    const handleCloseLogin = () => {
        setLogIn(false)
    }

    return (
        <React.Fragment>
            {!hideHeader &&
            <React.Fragment>
                <Dialog onClose={handleCloseLogin} aria-labelledby="simple-dialog-title" open={logIn}>
                    <LogInForm/>
                </Dialog>

                <AppBar position="static">
                    <Toolbar>
                        {shown &&
                        <IconButton onClick={() => {
                            dispatch(toggle(!opened))
                        }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            {opened ?
                                <CloseIcon/> :
                                <MenuIcon/>
                            }
                        </IconButton>
                        }
                        <Typography className={classes.title} variant="h6">
                            <Link className={classes.link} component={RouterLink} to={"./"}>
                                Victory
                            </Link>
                        </Typography>
                        
                        <IconButton onClick={() => {
                            dispatch(dark())
                        }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            {darkTheme ?
                                <Brightness7Icon/>:
                                <Brightness2OutlinedIcon/>

                            }
                        </IconButton>
                        <Button color="inherit" onClick={() => {
                            setLogIn(true)
                        }}>Войти</Button>
                        <Button color="inherit"><Link className={classes.link} component={RouterLink}
                                                      to={"/signup"}>Зарегестрироваться</Link></Button>
                    </Toolbar>
                </AppBar>

            </React.Fragment>}
        </React.Fragment>
    );
};

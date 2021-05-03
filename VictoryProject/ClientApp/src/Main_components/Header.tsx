import React, { useState } from "react";

import { Link as RouterLink } from "@reach/router";

import {AppBar, Toolbar, IconButton, Button, Typography, Link, Drawer} from "@material-ui/core";
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useDispatch, useSelector } from "react-redux";
import { toggle, selectSidebarOpen } from "../state/sidebarSlice";

import { CSSTransition } from "react-transition-group";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { LogInForm } from "../Forms/LogInForm";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position:"sticky",
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow:1,
    },
    link:{
        "&:visited":{
            color:"inherit",
           
        },
        "&:hover":{
            textDecoration: 'none',
        }
    }
}));


//TODO: Опираться на то, авторизован пользователь или нет при показе полей
export const Header = () => {
    
    const classes = useStyles();
  const dispatch = useDispatch();
  const opened = useSelector(selectSidebarOpen);
  const [logIn, setLogIn] = useState(false);

  
  return (
    <React.Fragment>
      {logIn && (
        <React.Fragment>
          <div
            onClick={() => {
              setLogIn(false);
            }}
            className="modalHideControls"
          />
        </React.Fragment>
      )}
      <CSSTransition
        unmountOnExit={true}
        in={logIn}
        timeout={500}
        classNames="fadeIn"
      >
        <LogInForm />
      </CSSTransition>
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={()=>{dispatch(toggle())}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {opened?
                        <CloseIcon />:
                         <MenuIcon />
                    }
                </IconButton>
                
                <Typography className={classes.title} variant="h6">
                    <Link className={classes.link} component={RouterLink} to={"./"}>
                    Victory
                    </Link>
                </Typography>
                
                <Button color="inherit" onClick={() => {setLogIn(true)}}>Войти</Button>
                <Button color="inherit"><Link className={classes.link} component={RouterLink} to={"/signup"}>Зарегестрироваться</Link></Button>
            </Toolbar>
        </AppBar>
    </React.Fragment>
  );
};

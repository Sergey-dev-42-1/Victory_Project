import {ExitToApp} from "@material-ui/icons";

import {Button, Portal, Snackbar} from "@material-ui/core";
import MuiAlert, {Color} from "@material-ui/lab/Alert";

import React, {useContext} from "react";
import {useNavigate} from "@reach/router";
import {useDispatch, useSelector} from "react-redux";
import {selectSidebarOpen, toggle} from "../state/sidebarSlice";
import {logout} from "../API/mainServices";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/core/";
import {UserContext} from "../App";


type snackbarState = {
    open: boolean;
    severity: Color;
    content: string;
};
const defaultSnackbar: snackbarState = {
    open: false,
    severity: "success",
    content: "",
};
const useStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        textTransform: "none",
        borderRadius: 0,
        overflow: "hidden",
    },
}));

//Кнопки настроены лишь выполнять навигацию по ссылке, кнопки с другой логикой нужно писать в самом компоненте
export const MainComposition = () => {
    
    const userContext = useContext(UserContext)
    
    const [snackbarType, setSnackbarTypeOpen] = React.useState<snackbarState>(
        defaultSnackbar
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sidebarOpen = useSelector(selectSidebarOpen)
    const classes = useStyles();

    const handleLogout = async () => {
       /* const response = await logout();
        
        console.log(response);
        if (response !== undefined && response.status === 200) {
            dispatch(toggle(!sidebarOpen));
             window.localStorage.removeItem("email")
            navigate("/signup")
        } 
        else {
            setSnackbarTypeOpen({
                open: true,
                severity: "error",
                content: "Ошибка выхода, попробуйте еще раз",
            });
        }*/
        dispatch(toggle(!sidebarOpen));
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("email")
        userContext.setUser({username:""})
        await navigate("/signup")
    };
    const handleClose = () => {
        setSnackbarTypeOpen(defaultSnackbar);
    };
    return (
        <React.Fragment>
            <Button
                onClick={() => {
                    dispatch(toggle(!sidebarOpen));
                    navigate("/main");
                }}
                className={ classes.button + " primaryButton"}
            >
                Ваши конкурсы
            </Button>
            <Button
                onClick={() => {
                    dispatch(toggle(!sidebarOpen));
                    navigate("/main");
                }}
                className={"primaryButton " + classes.button}
            >
                Все конкурсы
            </Button>
            <span className="spacer"/>
            <Button
                onClick={handleLogout}
                className={"primaryButton " + classes.button}
            >
                Выйти <ExitToApp style={{fontSize: "3vh"}}/>
            </Button>
            <Portal container={document.body}>
                <Snackbar
                    open={snackbarType.open}
                    onClose={handleClose}
                    autoHideDuration={5000}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity={snackbarType.severity}
                    >
                        {snackbarType.content}
                    </MuiAlert>
                </Snackbar>
            </Portal>
        </React.Fragment>
    );
};

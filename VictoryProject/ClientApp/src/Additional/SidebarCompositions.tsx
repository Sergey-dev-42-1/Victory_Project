import { ExitToApp } from "@material-ui/icons";

import { Snackbar, Button } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import React from "react";
import { useNavigate } from "@reach/router";
import { useDispatch } from "react-redux";
import { toggle } from "../state/sidebarSlice";
import { logout } from "../API/mainServices";
import {makeStyles, Theme} from "@material-ui/core/styles";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  button:{
    textTransform:"none",
    borderRadius: 0,
    overflow:"hidden"
  }
}));


//Кнопки настроены лишь выполнять навигацию по ссылке, кнопки с другой логикой нужно писать в самом компоненте
export const MainComposition = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleLogout = async () => {
    const response = await logout();
    console.log(response);
    if (response.status === 200) {
      dispatch(toggle());
    } else {
      setSnackbarOpen(true)
    }
  };
  const handleClose= () => {
    setSnackbarOpen(false)
  }
  return (
    <React.Fragment>
      <Button
          onClick={() => {
            dispatch(toggle())
            navigate("/main");
          }}
          className={"primaryButton " + classes.button}
      >
        Ваши конкурсы
      </Button>
      <Button
          onClick={() => {
            dispatch(toggle())
            navigate("/main");
          }}
          className={"primaryButton " + classes.button}
      >
        Все конкурсы
      </Button>
      <span className="spacer"/>
      <Button onClick={handleLogout} className={"primaryButton " + classes.button}>
        Выйти <ExitToApp style={{ fontSize: "3vh" }} />
      </Button>
      <Snackbar open={snackbarOpen} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity="error">Ошибка выхода, попробуйте снова</Alert>
      </Snackbar>
    </React.Fragment>
  );
};

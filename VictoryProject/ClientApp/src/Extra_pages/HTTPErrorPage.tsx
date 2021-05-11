import {RouteComponentProps} from "@reach/router";
import {Container, Paper, makeStyles, Typography} from '@material-ui/core';

import React from "react";

const useStyles = makeStyles({

  container:{

    display:"flex",
    alignSelf:"center",
    justifyContent:"center",
  },
  paper:{
    width: "400px",
    height: "300px",
    padding: "10px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
  }
})

interface Props extends RouteComponentProps{
  errorType: string,
  errorMessage?: string
}

export const HttpError = (props: Props) => {
  
React.useEffect(() => {
  console.log("effect")
  const timer = window.setTimeout(()=>{window.history.back()}, 5000)
  return () => {window.clearTimeout(timer)}
}, [])
  
  const classes = useStyles();
  return( <Container maxWidth="md" className={classes.container}>
    <Paper elevation={6} className={classes.paper}>
      <Typography align={"center"} variant={"h2"}>{props.errorType} </Typography>
      <Typography align={"center"} variant={"body2"}>{props.errorMessage}</Typography>
      <Typography align={"center"} variant={"subtitle1"}>Вы будете перенаправлены обратно через несколько секунд</Typography>
    </Paper>
    
  </Container>)
};

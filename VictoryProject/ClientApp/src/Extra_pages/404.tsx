import { Link, useNavigate, RouteComponentProps } from "@reach/router";
import {Container, Paper, makeStyles, Typography} from '@material-ui/core';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
const useStyles = makeStyles({

  container:{
    display:"flex",
    alignContent:"space-between",
    justifyContent:"center",
  },
  paper:{
    padding: "10px",
  }
})

export const NotFound = (props: RouteComponentProps) => {
  const classes = useStyles();
  return <Container maxWidth="md" className={classes.container}>
    <Paper elevation={6} className={classes.paper}>
      <Typography variant={"h2"}>HTTP 404 </Typography>
      Запрашиваемая страница не существует
      
    </Paper>
  </Container>;
};

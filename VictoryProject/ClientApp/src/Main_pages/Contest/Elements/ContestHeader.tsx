import {createStyles, Divider, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Contest} from "../../../Additional/Types";


interface Props {
    contest: Contest
}

const useStyles = makeStyles( (theme) => createStyles ( {
    root: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        flexGrow: 0.05,
        display: "flex",
        flexFlow: "row",
    },
    card: {
        height:"100%",
        justifyContent: "space-evenly"
    },
    section: {
        height: "80%",
        width: "33.3%",
        display: "flex", 
        justifyContent: "space-between",
        flexDirection: "column",
        alignSelf: "center",
        justifySelf: 'flex-start'
    },
    divider: {
        backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
        height:"80%",
        alignSelf: "center"
    },
    title: {
        height: "100%",
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
    },
    sectionTitle:{
        alignSelf:"flex-start"
    }
}))

export const ContestHeader = ({
      contest: {
          name,
          dateBeginning,
          dateEnding,
          status,
          applyDateBeginning,
          applyDateEnding,
          notes
      }
  }: Props) => {

    const classes = useStyles()
    return (
        
        <React.Fragment>
        <Paper  elevation={3} square className={classes.root}>
                <Grid className={classes.card} container>
                    <Grid item spacing={1} >
                        <Typography  className={classes.title} variant="h4" component="h2">
                            {name}
                        </Typography>
                    </Grid>
                    <Divider orientation={"vertical"} className={classes.divider}/>
                    <Grid item className={classes.section}>
                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Даты проведения
                        </Typography>
                        <Typography variant="h6" component="h4" >
                            {dateBeginning.toLocaleDateString() + "-" + dateEnding.toLocaleDateString()}
                        </Typography>
                    </Grid >
                    <Divider orientation={"vertical"} className={classes.divider}/>
                    <Grid item className={classes.section}>
                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Статус
                        </Typography>
                        <Typography  variant="h6" component="h4" >
                           
                            {status}
                        </Typography>
                    </Grid>
                </Grid>
        </Paper>
        </React.Fragment>
    )
}
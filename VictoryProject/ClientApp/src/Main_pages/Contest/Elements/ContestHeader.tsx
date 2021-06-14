import {createStyles, Divider, Grid, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {makeStyles} from "@material-ui/core/styles";
import React, {useContext} from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {ContestContext} from "../Context/contestContext";

import {useNavigate} from "@reach/router";


const useStyles = makeStyles((theme) => createStyles({
    root: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        flexGrow: 0.05,
        display: "flex",
        flexFlow: "row",
    },
    card: {
        height: "100%",
        justifyContent: "space-evenly"
    },
    section: {
        height: "80%",

        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignSelf: "center",
        justifySelf: 'flex-start'
    },
    divider: {
        backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),
        height: "80%",
        alignSelf: "center"
    },
    title: {
        height: "100%",
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
    },
    sectionTitle: {
        alignSelf: "flex-start"
    },
    Button: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        display: "flex"
    }
}))

export const ContestHeader = () => {
    const navigate = useNavigate();
    const contest = useContext(ContestContext)
    const classes = useStyles()
    return (

        <React.Fragment>
            <Paper elevation={3} square className={classes.root}>

                <Grid className={classes.card} container>

                    <Grid item style={{display: "flex", alignItems: "center"}}>
                        <Grid item>

                            <Tooltip title={"Назад"}>

                                <IconButton onClick={() => {

                                    navigate("/")
                                }} className={classes.Button}>
                                    <ArrowBackIcon fontSize={"large"}/>

                                </IconButton>

                            </Tooltip>

                        </Grid>

                        <Grid item>
                            <Typography className={classes.title} variant="h4" component="h2">
                                {contest.Name}
                            </Typography>
                        </Grid>

                    </Grid>

                    <Divider orientation={"vertical"} className={classes.divider}/>

                    <Grid item className={classes.section}>
                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Даты проведения
                        </Typography>
                        <Typography variant="h6" component="h4">
                            {new Date(contest.StartDate).toLocaleString() + " - " + new Date(contest.EndDate).toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.section}>
                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Дата начала приема заявок
                        </Typography>
                        <Typography variant="h6" component="h4">
                            {new Date(contest.StartRegistrationDate).toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.section}>
                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Даты окончания приема заявок
                        </Typography>
                        <Typography variant="h6" component="h4">
                            {new Date(contest.EndRegistrationDate).toLocaleString()}
                        </Typography>
                    </Grid>


                    <Divider orientation={"vertical"} className={classes.divider}/>

                    <Grid item className={classes.section}>

                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Статус
                        </Typography>
                        <Typography variant="h6" component="h4">
                            {contest.Status}
                        </Typography>

                    </Grid>

                    <Grid style={{display: "flex", alignItems: "center"}} item>

                        <Tooltip title={"Перейти на страницу конкурса"}>
                            <IconButton className={classes.Button} onClick={() => {
                                navigate(`/contest/${contest.Id}/presentation/news`)
                            }}>
                                <OpenInNewIcon/>
                            </IconButton>
                        </Tooltip>

                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
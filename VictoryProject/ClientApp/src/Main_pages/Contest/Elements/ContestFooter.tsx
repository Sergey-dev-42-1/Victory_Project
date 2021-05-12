import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React, {useContext} from "react";
import {ContestContext} from "../Context/contestContext"
import {Typography} from "@material-ui/core/";

const useStyles = makeStyles((theme) => (createStyles({
    footer: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        padding: theme.spacing(2),
        height: "10%",
    },

})))

export const ContestFooter = () => {
    const contest = useContext(ContestContext)
    const classes = useStyles();
    return (
        <Grid container className={classes.footer}>
            <Grid item xs={4}   >
                <Typography>
                    Подвал страницы организатора
                </Typography>
                {localStorage.getItem("email")}
            </Grid>
        </Grid>
    )
}
import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React, {useContext} from "react";
import {ContestPresentationContext} from "../PresentationPage"
import {Typography} from "@material-ui/core/";

const useStyles = makeStyles((theme) => (createStyles({
    footer: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        padding: theme.spacing(2),
        height: "10%",
    },

})))

export const ContestPresentationFooter = () => {
    const contest = useContext(ContestPresentationContext)
    const classes = useStyles();
    return (
        <Grid container className={classes.footer}>
            <Grid item xs={4}   >
                <Typography>
                    Email организатора:
                </Typography>
                {localStorage.getItem("email")}
            </Grid>
        </Grid>
    )
}
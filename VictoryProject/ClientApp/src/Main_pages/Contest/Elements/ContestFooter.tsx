import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => (createStyles({
    footer: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        height: "10%",
    },

})))

export const ContestFooter= () => {
    const classes = useStyles();
    return(
    <Grid item xs={12} className={classes.footer}>
        123
    </Grid>
    )
}
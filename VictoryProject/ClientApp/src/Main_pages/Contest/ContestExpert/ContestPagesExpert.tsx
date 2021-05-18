import {Router} from "@reach/router";
import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React from "react";
import {WorksRubric} from "../Elements/Content/WorksRubric";

const useStyles = makeStyles(() => (createStyles({
    content: {
        height: "90%",
    },
})))

export const ContestPagesExpert = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={10} className={classes.content}>
            <Router id="routerWrapper">
                <WorksRubric hideAuthor={true} path={`/works`}/>
            </Router>
        </Grid>
    )
}
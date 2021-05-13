import {Router} from "@reach/router";
import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React from "react";
import {ApplicationsRubric} from "./Elements/ApplicationsRubric";
import {WorksParticipantRubric} from "./Elements/WorksParticipantRubric";

const useStyles = makeStyles(() => (createStyles({
    content: {
        height: "90%",
    },
})))

export const ContestPagesParticipant = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={10} className={classes.content}>
            <Router id="routerWrapper">
                <WorksParticipantRubric path={`/works`}/>
                <ApplicationsRubric path={`/applications`}/>
            </Router>
        </Grid>
    )
}
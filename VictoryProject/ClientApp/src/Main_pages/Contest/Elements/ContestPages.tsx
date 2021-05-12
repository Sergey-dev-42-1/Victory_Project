import {Router} from "@reach/router";
import {NewsRubric} from "./Content/NewsRubric";
import {ParticipantsRubric} from "./Content/ParticipantsRubric";
import {ExpertsRubric} from "./Content/ExpertsRubric";
import {CustomizationRubric} from "./Content/CustomizationRubric";
import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => (createStyles({
    content: {
        height: "90%",
    },
})))

export const ContestPages = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={10} className={classes.content}>
            <Router id="routerWrapper">
                <NewsRubric path={`/news`}/>
                <ParticipantsRubric path={"/participants"}/>
                <ExpertsRubric path={"/experts"}/>
                <CustomizationRubric path={"/customization"}/>
            </Router>
        </Grid>
    )
}
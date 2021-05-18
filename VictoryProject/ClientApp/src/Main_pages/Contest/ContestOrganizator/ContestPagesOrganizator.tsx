import {Router} from "@reach/router";
import {NewsRubric} from "./Elements/NewsRubric";
import {ParticipantsRubric} from "./Elements/ParticipantsRubric";
import {ExpertsRubric} from "./Elements/ExpertsRubric";
import {CustomizationRubric} from "./Elements/CustomizationRubric";
import {createStyles, Grid, makeStyles} from "@material-ui/core";
import React from "react";
import {WorksRubric} from "../Elements/Content/WorksRubric";
import {Theme} from "@material-ui/core/";

const useStyles = makeStyles(() => (createStyles({
    content: {
        height: "90%",
    },
})))
interface Props {
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}
 
export const ContestPagesOrganizator = (props:Props) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={10} className={classes.content}>
            <Router id="routerWrapper">
                <WorksRubric path={`/works`}/>
                <NewsRubric path={`/news`}/>
                <ParticipantsRubric path={"/participants"}/>
                <ExpertsRubric path={"/experts"}/>
                <CustomizationRubric {...props} path={"/customization"}/>
            </Router>
        </Grid>
    )
}
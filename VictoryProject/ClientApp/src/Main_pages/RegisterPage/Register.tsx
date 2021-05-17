import {RegistrationForm} from "../../Forms/RegistrationForm";

import {RouteComponentProps} from "@reach/router";
import React from "react";
import {Box, createStyles, Grid, Paper, Typography} from "@material-ui/core";
import {FeatureCard} from "./Components/FeatureCard"
import {Footer} from "../../Main_components/Footer";
import {makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            alignContent: "space-around",

            flexGrow: 0.5,
        },
        featureContainer: {
            padding: "20px 30px",
            height: "100%",

            display: "flex",
            alignContent: "center",

        },
        slogan: {
            padding: theme.spacing(1)
        },

        features: {
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing(1)
        }
    }),
);


export const Register = (props: RouteComponentProps) => {
    const classes = useStyles();
    return (
        <div className="RegPageContainer">
            <div className="regContentContainer">
                <Box display={{ xs: 'none', lg: 'inherit'}} >
                    <Grid>

                        <Paper elevation={3} square className={classes.featureContainer}>
                            <Grid container className={classes.root}>
                                <Typography className={classes.slogan} variant={"h4"} align={"center"}>
                                    Victory - сервис, позволящий организовать и провести конкурс с минимум
                                    усилий, для всех участников процесса: организаторов, экспертов и
                                    участников
                                </Typography>
                                <Grid container justify={"space-around"}>
                                    <Grid container>
                                        <Grid item className={classes.features} lg={4}>
                                            <FeatureCard title={"Организовывать"}
                                                         content={"Организовывайте любые конкурсы, приглашайте участников и экспертов"}
                                                         cardImg={require("../../static/img/cards/organizeFeature.jpg")}/>
                                        </Grid>
                                        <Grid item className={classes.features} lg={4}>
                                            <FeatureCard title={"Оценивать"}
                                                         content={"Участвуйте в процессе оценки работ, используя интуитивно понятный интерфейс"}
                                                         cardImg={require("../../static/img/cards/assessFeature.jpg")}/>
                                        </Grid>
                                        <Grid item className={classes.features} lg={4}>
                                            <FeatureCard title={"Участвовать"}
                                                         content={"Подавайте заявки на любые интересные вам конкурсы"}
                                                         cardImg={require("../../static/img/cards/participateFeature.jpg")}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                    
                </Box>
                <RegistrationForm/>
                <Footer/>
        </div>
</div>
)
    ;
};

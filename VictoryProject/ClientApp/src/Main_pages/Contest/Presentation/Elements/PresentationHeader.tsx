import {Button, createStyles, Divider, Grid, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {useContext} from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {ContestPresentationContext} from "../PresentationPage";

import {RouteComponentProps, useNavigate} from "@reach/router";
import {borderRadius} from "@material-ui/system";
import {RubricTabs} from "../PresentationRubrics/Elements/RubricTabs";


const useStyles = makeStyles((theme) => createStyles({
    root: {
        top: 0,
        position: "sticky",
        width: "100%",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        zIndex: 1099,
        flexGrow: 0,
        display: "flex",
        flexFlow: "row",
    },
    card: {
        height: "100%",
        justifyContent: "space-evenly"
    },
    section: {
        padding: "10px 10px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignSelf: "center",
        justifySelf: 'flex-start'
    },
    divider: {
        backgroundColor: theme.palette.getContrastText(theme.palette.primary.main),

        alignSelf: "center"
    },
    title: {
        height: "100%",
        padding: "0 10px",
        display: "flex",
        flexGrow: 1,
    },
    sectionTitle: {

        alignSelf: "flex-start"
    },
    Button: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        display: "flex"
    },
    SNButton: {
        //если оставить как есть(по умолчанию 24px, как и svg), появляется белая полоска снизу, до ререндера
        height:"22px",
        padding: 0,
        borderRadius: "8px",
        backgroundColor: "white",
        fill: "#306d82",
        margin: "0 10px",
        "&:hover": {
            backgroundColor: "rgb(231,107,32)",
        },
    }
}))
const vkIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm.25 16.996h-2.134c-1.205 0-1.409-.687-2.401-1.679-.897-.897-1.395-.209-1.374 1.068.006.339-.161.611-.566.611-1.264 0-3.08.178-4.918-1.806-1.883-2.033-3.857-6.111-3.857-6.513 0-.237.196-.344.524-.344h2.17c.574 0 .623.284.783.649.667 1.521 2.265 4.574 2.69 2.87.244-.978.344-3.245-.703-3.44-.594-.11.452-.746 1.968-.746.377 0 .786.041 1.205.137.769.179.771.523.761 1.026-.039 1.903-.269 3.184.233 3.507.479.31 1.739-1.717 2.403-3.281.183-.433.219-.722.734-.722h2.654c1.39 0-.182 1.997-1.383 3.557-.968 1.255-.916 1.28.209 2.324.803.744 1.75 1.76 1.75 2.336.002.272-.21.446-.748.446z"/>
</svg>
const fbIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"/>
</svg>
const lninIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
export const ContestPresentationHeader = (props: RouteComponentProps) => {
    const navigate = useNavigate();
    const contest = useContext(ContestPresentationContext)
    const classes = useStyles()
    return (

        <React.Fragment>
            <Paper elevation={3} square className={classes.root}>

                <Grid className={classes.card} container>

                    <Grid item style={{display: "flex", alignItems: "center"}}>

                        <Grid item>
                            <Typography className={classes.title} variant="h5" component="h2">
                                {contest.name + " " + contest.id}
                            </Typography>
                        </Grid>

                    </Grid>


                    <Grid item className={classes.section}>

                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Статус
                        </Typography>
                        <Typography variant="h6" style={{paddingRight: "10px"}} component="h4">
                            {contest.status}
                        </Typography>

                    </Grid>

                    <Grid item className={classes.section}>
                        <Grid  style={{alignItems: "start"}}>
                            
                            <IconButton className={classes.SNButton} onClick={() => window.location.href = "https://vk.com"}>
                                {vkIcon}
                            </IconButton>
                            <IconButton className={classes.SNButton}
                                        onClick={() => window.location.href = "https://facebook.com"}>
                                {fbIcon}
                            </IconButton>
                            <IconButton className={classes.SNButton}
                                        onClick={() => window.location.href = "https://linkedin.com"}>
                                {lninIcon}
                            </IconButton>

                        </Grid>
                    </Grid>
                   
                    {/*Имплементация нестабильная, в зависимости от часового пояса будет разниться, лучше использовать время сервера для этого либо нормализовывать все даты по одному поясу*/}
                    <Grid style={{display: "flex", alignItems: "center", padding: "0 10px"}} item>
                        {(Date.now() > contest.applyDateBeginning && Date.now() < contest.applyDateEnding) &&
                        <Button variant={"contained"} onClick={() => {
                            console.log("clicked")
                        }} color={"secondary"}>Принять участие</Button>
                        }
                        {(Date.now() > contest.dateBeginning && Date.now() < contest.applyDateBeginning) &&
                        <Typography variant={"body1"}>Прием работ еще не открыт</Typography>
                        }
                        {(Date.now() > contest.applyDateEnding && Date.now() < contest.dateEnding) &&
                        <Typography variant={"body1"}>Прием работ окончен, результаты будут объявлены после
                            завершения</Typography>
                        }
                        {(Date.now() > contest.dateEnding) &&
                        <Typography variant={"body1"}>Конкурс окончен!</Typography>
                        }
                    </Grid>
                    <RubricTabs {...props}/>
                </Grid>
            </Paper>
          
        </React.Fragment>
    )
}
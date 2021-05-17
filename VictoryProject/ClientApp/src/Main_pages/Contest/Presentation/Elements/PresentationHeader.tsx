import {Button, createStyles, Divider, Grid, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, {useContext} from "react";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {ContestPresentationContext} from "../PresentationPage";

import {useNavigate} from "@reach/router";


const useStyles = makeStyles((theme) => createStyles({
    root: {
        top: 0,
        position: "sticky",
        width: "100%",
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
        
        flexGrow: 0,
        display: "flex",
        flexFlow: "row",
    },
    card: {
        height: "100%",
        justifyContent: "space-evenly"
    },
    section: {
        padding: "0 10px",
        flexGrow: 1,
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
    }
}))

export const ContestPresentationHeader = () => {
    const navigate = useNavigate();
    const contest = useContext(ContestPresentationContext)
    const classes = useStyles()
    return (

        <React.Fragment>
            <Paper elevation={3} square className={classes.root}>

                <Grid className={classes.card} container>

                    <Grid item style={{display:"flex",alignItems:"center"}}>

                        <Grid item>
                            <Typography className={classes.title} variant="h5" component="h2">
                                {contest.name +" "+ contest.id}
                            </Typography>
                        </Grid>

                    </Grid>


                    <Divider orientation={"vertical"} className={classes.divider}/>

                    <Grid item className={classes.section}>

                        <Typography className={classes.sectionTitle} variant="h5" component="h5">
                            Статус
                        </Typography>
                        <Typography variant="h6" style={{paddingRight:"10px"}} component="h4">
                            {contest.status}
                        </Typography>

                    </Grid>
                    {/*Имплементация нестабильная, в зависимости от часового пояса будет разниться, лучше использовать время сервера для этого либо нормализовывать все даты по одному поясу*/}
                    <Grid style={{display:"flex",alignItems:"center", padding:"0 10px"}} item >
                        {( Date.now() > contest.applyDateBeginning && Date.now() < contest.applyDateEnding) && 
                        <Button variant={"contained"} onClick={()=>{console.log("clicked")}} color={"secondary"}>Принять участие</Button>
                        }
                        {( Date.now() > contest.dateBeginning && Date.now() < contest.applyDateBeginning) &&
                        <Typography variant={"body1"}>Прием работ еще не открыт</Typography>
                        }
                        {( Date.now() > contest.applyDateEnding && Date.now() < contest.dateEnding) &&
                        <Typography variant={"body1"}>Прием работ окончен, результаты будут объявлены после завершения</Typography>
                        }
                        {( Date.now() > contest.dateEnding) &&
                        <Typography variant={"body1"}>Конкурс окончен!</Typography>
                        }
                        </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )
}
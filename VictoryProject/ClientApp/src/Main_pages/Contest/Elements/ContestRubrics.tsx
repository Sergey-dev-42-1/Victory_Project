﻿import {Grid, List, ListItem, ListItemText, makeStyles, Drawer,} from "@material-ui/core";
import React, {useContext} from "react";
import {useNavigate, RouteComponentProps} from "@reach/router";
import {ContestContext} from "../Context/contestContext"
const useStyles = makeStyles((theme) => ({
    drawer:{
        height:"100%",
    },
    drawerPaper:{
        height:"100%",
        position: "relative",
        zIndex: 1
    },
    rubricsContainer:{
        paddingTop:0,
    },
    pages: {
        height: "90%",
    },
}))
const rubrics = [{name:'Новости',url:`news`},
    {name:'Участники',url:`participants`},
    {name:'Эксперты',url:`experts`},
   {name:'Кастомизация',url:`customization`}]

export const ContestRubrics = () => {
    const navigate = useNavigate()
    const classes = useStyles();
    const context = useContext(ContestContext)
    return (
        <Grid item xs={12} md={2} className={classes.pages}>
            <Drawer
                className={classes.drawer}
                PaperProps={{elevation:3,className:classes.drawerPaper}}
                variant="permanent"
                anchor="left"
            >
                <List className={classes.rubricsContainer}>
                    {rubrics.map((item) => (
                        <ListItem button key={item.name} onClick={()=>{navigate("/contest/" + context.id +"/"+  item.url)}}>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Grid>
    )
}
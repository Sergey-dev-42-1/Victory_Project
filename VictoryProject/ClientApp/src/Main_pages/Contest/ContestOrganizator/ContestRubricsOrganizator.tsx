import {Drawer, Grid, List, ListItem, ListItemText, makeStyles,} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {useNavigate} from "@reach/router";
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
    {name:'Поданные работы',url:`works`},
    {name:'Участники',url:`participants`},
    {name:'Эксперты',url:`experts`},
    {name:'Кастомизация',url:`customization`}
   ]

export const ContestRubricsOrganizator = () => {
    const navigate = useNavigate()
    
    const classes = useStyles();
    
    const contest = useContext(ContestContext)
    
    const [selected, setSelected] = useState("");
    
    const handleRubricClick = (item: {name: string, url: string})=>{
        setSelected(item.name)
        navigate("/contest/" + contest.id +"/"+  item.url)
    }
    
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
                        <ListItem selected={item.name === selected} button key={item.name} onClick={() => {handleRubricClick(item)}}>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Grid>
    )
}
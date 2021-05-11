import {Grid, List, ListItem, ListItemText, makeStyles, Drawer,} from "@material-ui/core";
import React from "react";

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

export const ContestRubrics = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={2} className={classes.pages}>
            <Drawer
                className={classes.drawer}
                PaperProps={{elevation:3,className:classes.drawerPaper}}
                variant="permanent"
                anchor="left"
            >
                <List className={classes.rubricsContainer}>
                    {['Новости', 'Участники', 'Эксперты', 'Организаторы'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Grid>
    )
}
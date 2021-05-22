import {Box, createStyles, makeStyles, TextField} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((Theme) => createStyles({
    root: {
        display: "flex",
        flexFlow: "row wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "baseline"
    },
    field:{
        margin: Theme.spacing(3),
        width: "20%"
    }
}))

export const FileLayout = () => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
             В процессе
        </Box>
    )
}
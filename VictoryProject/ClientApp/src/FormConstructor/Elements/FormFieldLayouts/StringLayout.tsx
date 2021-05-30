import {Box, createStyles, Divider, makeStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {ApplicationField} from "../../../Additional/Types";

const useStyles = makeStyles((Theme) => createStyles({
    root: {
        display: "flex",
        flexGrow: 1,
        flexFlow: "column",
    },
    constraints: {
        display: "flex",
        flexFlow: "row wrap",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "baseline"
    },
    field: {
        margin: Theme.spacing(3),
        width: "20%"
    }
}))

interface Props {
    item: ApplicationField,
    sendConstraints: (constraints: any) => void
}

export const StringLayout = ({item,sendConstraints}: Props) => {
    const classes = useStyles()
    const [constraints, setConstraints] = useState(item.constraints)
   
    return (
        <Box  className={classes.root}>
            <div>
                Ограничения
                <Divider/>
            </div>
            <Box className={classes.constraints}>
                <p>от</p>
                <TextField type={"number"} value ={constraints.min} onChange={(e) => {
                    const update = {...constraints, min: parseInt(e.currentTarget.value)}

                    setConstraints({...constraints, min: parseInt(e.currentTarget.value)})
                    sendConstraints(update)

                }} className={classes.field} size="small" label="Минимум"
                />
                <p>до</p>
                <TextField type={"number"} value ={constraints.max}  onChange={(e) => {
                    const update = {...constraints, max: parseInt(e.currentTarget.value)}

                    setConstraints({...constraints, max: parseInt(e.currentTarget.value)})
                    sendConstraints(update)

                }} className={classes.field} size="small" label="Максимум"/>
                <p>знаков</p>
            </Box>
        </Box>
    )
}
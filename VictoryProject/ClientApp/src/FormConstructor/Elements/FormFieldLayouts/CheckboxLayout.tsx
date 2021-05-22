import {Box, createStyles, Divider, makeStyles, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {ApplicationField} from "../../../Additional/Types";

const useStyles = makeStyles((Theme) => createStyles({
    root:{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
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
        width: "100%"
    }
}))


interface Props {
    item: ApplicationField,
    sendConstraints: (constraints: any) => void
}

export const CheckBoxLayout = ({item,sendConstraints}: Props) => {
    const classes = useStyles()
    const [constraints, setConstraints] = useState(item.constraints)

    return (
        <Box className={classes.root}>
            <div>
                Ограничения
                <Divider/>
            </div>
            <Box className={classes.constraints}>
                <TextField onChange={(e)=>{
                    const update = {...constraints, min: parseInt(e.currentTarget.value)}

                    setConstraints({...constraints, min: parseInt(e.currentTarget.value)})
                    sendConstraints(update)
                }} className={classes.field} label="Подпись"
                />
            </Box>
        </Box>
    )
}

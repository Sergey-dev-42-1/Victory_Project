import {
    Box,
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import React, {useState} from "react";
import {FormConstructor} from "../../../../../FormConstructor/FormConstructor";
import {ApplicationField} from "../../../../../Additional/Types";
import {CustomForm} from "../../../../../Forms/CustomForm";

const useStyles = makeStyles((Theme) => createStyles({
    formChangeContainer: {
        padding: Theme.spacing(2),
        margin: Theme.spacing(2),
        border: "2px solid rgba(0,0,0,0.33)",
        borderRadius: "2%",

    },
    formTitle: {
        padding:"0 10px",
        textAlign: "center",
        marginTop: -Theme.spacing(4),
        paddingBottom: Theme.spacing(2.5)
    },
    formsRoot: {},
    formButtonContainer: {
        alignItems: "center"
    },
    titleContainer: {
        backgroundColor: Theme.palette.background.default,
        width: "fit-content"
    },
}))

export const FormsCustomization = () => {
    const initialState = {ApplicationForm:false, WorksForm:false,AssessForm:false}
    const [formsOpen, setFormsOpen] = useState(initialState)
    const [formsViewOpen, setFormsViewOpen] = useState(initialState)

    const classes = useStyles();
    const [values, setValues] = useState([] as ApplicationField[])
    const currentState = window.localStorage.getItem("testForm")
    const parsedCurrentState : ApplicationField[] = currentState ? JSON.parse(currentState) : values
    function handleSaveForm() {
        window.localStorage.setItem("testForm", JSON.stringify(values))
        console.log(values)
    }
    function saveData (values:ApplicationField[]) {
        setValues(values)
    }

    return (
        <Box  p={3} style={{marginTop: "20px"}}>

            <Dialog fullWidth maxWidth={"md"} onClose={()=>{setFormsOpen(initialState); setValues([])}} open={formsOpen.ApplicationForm || formsOpen.WorksForm || formsOpen.AssessForm}>
                <DialogTitle>
                    Изменить форму
                </DialogTitle>
                <DialogContent>
                    <FormConstructor saveData={saveData}/>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"secondary"} onClick={handleSaveForm}>Сохранить изменения</Button>
                </DialogActions>
            </Dialog>
            
            <Dialog fullWidth maxWidth={"sm"} onClose={()=>{setFormsViewOpen(initialState)}} open={formsViewOpen.ApplicationForm || formsViewOpen.WorksForm || formsViewOpen.AssessForm}>
                <CustomForm Fields={parsedCurrentState} Submit={(data:any)=>{setFormsViewOpen(initialState)}}/>
            </Dialog>
            
            <Grid container className={classes.formsRoot}>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Заявка участника</Typography>
                    </div>
                    <Grid container spacing={3} className={classes.formButtonContainer}>
                            <Grid item>
                            <Button onClick={() => {
                                setFormsOpen({...formsOpen, ApplicationForm: true})
                            }} variant={"contained"} color={"primary"}>Просмотр/Изменение</Button>
                            </Grid>
                            <Grid item>
                            <Button onClick={() => {
                                setFormsViewOpen({...formsViewOpen, ApplicationForm: true})
                            }} variant={"contained"} color={"secondary"}>Предпросмотр</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Оценка работы</Typography>
                    </div>
                    <Grid container spacing={3} className={classes.formButtonContainer}>
                        <Grid item>
                            <Button onClick={() => {
                                setFormsOpen({...formsOpen, AssessForm: true})
                            }} variant={"contained"} color={"primary"}>Просмотр/Изменение</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => {
                                setFormsViewOpen({...formsViewOpen,AssessForm: true})
                            }} variant={"contained"} color={"secondary"}>Предпросмотр</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Подача работы</Typography>
                    </div>
                    <Grid container spacing={3} className={classes.formButtonContainer}>
                        <Grid item>
                            <Button onClick={() => {
                                setFormsOpen({...formsOpen, WorksForm: true})
                            }} variant={"contained"} color={"primary"}>Просмотр/Изменение</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => {
                                setFormsViewOpen({...formsViewOpen,WorksForm: true})
                            }} variant={"contained"} color={"secondary"}>Предпросмотр</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
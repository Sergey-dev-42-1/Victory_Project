import {Box, Button, createStyles, Dialog, DialogContent, Grid, makeStyles, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {EditorForm} from "./EditorForm"



const useStyles = makeStyles((Theme) => createStyles({
    formChangeContainer: {
        padding: Theme.spacing(2),
        border: "2px solid rgba(0,0,0,0.33)",
        borderRadius: "2%",
        margin: "0 30px"
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

export const ContentCustomization = () => {
    const initialState = {MainForm:false, TermsForm:false}
    const classes = useStyles()
    const [formsOpen, setFormsOpen] = useState(initialState)
    

    return (
        <Box p={3} style={{marginTop: "20px"}}>
            
            <Dialog fullWidth maxWidth={"lg"} onClose={()=>{setFormsOpen(initialState)}} open={formsOpen.MainForm || formsOpen.TermsForm}>
                <DialogContent  >
                    <EditorForm setFormOpened={setFormsOpen}/>
                </DialogContent>
            </Dialog>
            
            <Grid container className={classes.formsRoot}>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Главная страница</Typography>
                    </div>
                    <Grid container spacing={3}  className={classes.formButtonContainer}>
                        <Grid item>
                            <Button onClick={()=>{setFormsOpen({...formsOpen, MainForm: true})}} variant={"contained"} color={"secondary"}>Просмотр/Изменение</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Положения конкурса</Typography>
                    </div>
                    <Grid container spacing={3} className={classes.formButtonContainer}>
                        <Grid item>
                            <Button onClick={()=>{setFormsOpen({...formsOpen, MainForm: true})}} variant={"contained"} color={"secondary"}>Просмотр/Изменение</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Application, ApplicationField} from '../../Additional/Types';
import {schemaConstructor} from '../../Additional/yupSchemaConstructor';
import {FormInputField} from "../Elements/FormInputField";

import {
    Button,
    createStyles,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((Theme) => createStyles({
    title: {
        color:Theme.palette.getContrastText(Theme.palette.primary.main),
        backgroundColor: Theme.palette.primary.main
    },
    form: {
        height: "80vh",
        maxWidth: "800px",
        display: "flex",
        flexFlow: "column nowrap"
    },
    fieldset: {
        alignContent: "center",
        flexGrow: 1
    },
    input: {
        margin: Theme.spacing(1)
    },
    linkContainer:{
        
    }
}))

interface Props {
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    Application: Application
}





export const ApplicationAssessForm = ({setFormOpen, Application}:Props) => {
    const [submitted, setSubmitted] = React.useState(false);

    const fields = Application.fields
    
    const classes = useStyles();
    const schema = schemaConstructor(Application)
    console.log(schema)
    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(schema),
        shouldFocusError: true,
    });
    const Submit = async (data: any) => {
        setSubmitted(true)
        setFormOpen(false)
    };

    return (
        <React.Fragment>
            <DialogTitle className={classes.title}>Оценить работу</DialogTitle>
            <DialogContent>
                <form autoComplete={"off"} className={classes.form}>
                    <Grid container className={classes.linkContainer}><Link href={Application.fileUrl} download>Загрузить работу</Link></Grid>
                    <Grid container className={classes.fieldset}>
                       
                        {fields.map((field:ApplicationField, index)=>{
                            return(
                            <Grid container item xs={12}>
                                <FormInputField
                                    type={field.type}
                                    label={field.name}
                                    placeholder={field.name}
                                    fieldName={field.name}
                                    formSet={formSet}
                                    extra={{className: classes.input, fullWidth: true}}
                                />
                            </Grid>
                            )
                        })}
                    </Grid>

                    <DialogActions>
                        <Button
                            variant="contained"
                            disabled={formSet.formState.isSubmitting || submitted}
                            formAction="submit"
                            onClick={formSet.handleSubmit(Submit)}
                        >
                            Отправить
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </React.Fragment>
    );
};

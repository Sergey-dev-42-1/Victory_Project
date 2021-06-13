import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ApplicationField} from "../Additional/Types";
import {schemaConstructor} from '../Additional/yupSchemaConstructor';
import {FormInputField} from "./Elements/FormInputField";

import {
    Button,
    createStyles,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,

    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((Theme) => createStyles({
    title: {
        color:Theme.palette.getContrastText(Theme.palette.primary.main),
        backgroundColor: Theme.palette.primary.main
    },
    form: {
        height: "80vh",
        maxWidth:"800px",
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
    Title: string,
    Fields: ApplicationField[]
    Submit: (data:any)=>void
}





export const CustomForm = ({Title, Submit, Fields}:Props) => {
    const [submitted, setSubmitted] = React.useState(false);

    const [fields,setFields] = useState(Fields)

    const classes = useStyles();
    console.log(fields)
    const schema = schemaConstructor(Fields)
    console.log(schema)
    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(schema),
        shouldFocusError: true,
    });
    const SubmitForm = (data:any) => {
        setSubmitted(true)
        console.log(data)
        Submit(data)
    }

    return (
        <React.Fragment>
            <DialogTitle className={classes.title}>{Title}</DialogTitle>
            <DialogContent>
                <form autoComplete={"off"} className={classes.form}>
                    <Grid container className={classes.fieldset}>
                        {fields.map((field:ApplicationField)=>{
                            return(
                                    <FormInputField
                                        key={field.id}
                                        id={field.id}
                                        type={field.type}
                                        label={field.name}
                                        placeholder={field.name}
                                        fieldName={field.name}
                                        formSet={formSet}
                                        extra={{className: classes.input, fullWidth: true}}
                                    />
                            )
                        })}
                    </Grid>

                    <DialogActions>
                        <Button
                            variant="contained"
                            disabled={formSet.formState.isSubmitting || submitted}
                            formAction="submit"
                            onClick={formSet.handleSubmit(SubmitForm)}
                        >
                            Отправить
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </React.Fragment>
    );
};
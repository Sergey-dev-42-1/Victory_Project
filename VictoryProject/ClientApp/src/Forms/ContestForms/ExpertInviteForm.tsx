import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup"
import {FormInputField} from "../Elements/FormInputField";

import {Button, createStyles, DialogActions, DialogContent, DialogTitle, Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((Theme) => createStyles({
    title: {
        color: Theme.palette.getContrastText(Theme.palette.primary.main),
        backgroundColor: Theme.palette.primary.main
    },
    form: {
        height: "auto",
        width: "400px",
        maxWidth: "600px",
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
    linkContainer: {}
}))

interface Props {
    onSubmit: () => void;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const formSchema = object({Email: string().email("Некорректный E-mail").required("Введите E-mail")})

export const ExpertInviteForm = ({setFormOpen, onSubmit}: Props) => {
    
    const [submitted, setSubmitted] = React.useState(false);

    const classes = useStyles();


    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(formSchema),
        shouldFocusError: true,
    });
    const Submit = async (data: any) => {
        setSubmitted(true)
        onSubmit()
        setFormOpen(false)
    };

    return (
        <React.Fragment>
            <DialogTitle className={classes.title}>Пригласить эксперта</DialogTitle>
            <DialogContent>
                <form autoComplete={"off"} className={classes.form}>

                    <Grid container className={classes.fieldset}>

                        <Grid container item xs={12}>
                            <FormInputField
                                type={"email"}
                                label={"E-mail эксперта"}
                                placeholder={"Введите E-mail"}
                                fieldName={"Email"}
                                formSet={formSet}
                                extra={{className: classes.input, fullWidth: true}}
                            />
                        </Grid>
                        
                    </Grid>

                    <DialogActions>
                        <Button
                            variant="contained"
                            disabled={formSet.formState.isSubmitting || submitted}
                            formAction="submit"
                            onClick={formSet.handleSubmit(Submit)}
                        >
                            Пригласить
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </React.Fragment>
    );
};

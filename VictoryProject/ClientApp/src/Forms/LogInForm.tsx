import React from "react";
import {useForm} from "react-hook-form";
import {string, object, SchemaOf} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {FormInputField} from "./Elements/FormInputField";
import {passwordAdornment} from "./Elements/PasswordVisibilityAdornment";
import {
    Button, createStyles,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    IconButton,
    InputAdornment,
    makeStyles
} from "@material-ui/core";
import {login} from "../API/mainServices";



interface FormFields {
    Email: string;
    Password: string;
}

interface Props {
    close: () => void;
}

const useStyles = makeStyles((Theme) => createStyles({
    title: {
        backgroundColor: Theme.palette.primary.main
    },
    form: {
        height: "300px",
        maxHeight: "400px",
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
    }
}))


const LogInFormSchema: SchemaOf<FormFields> = object({
    Email: string().required("Введите Email").defined(),
    Password: string().required("Введите пароль").defined(),
});
export const LogInForm = (props: Props) => {
    const [submitted, setSubmitted] = React.useState(false);
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);

    const passwordVisibilityChange = () => {passwordVisibility ? setPasswordVisibility(false)
        : setPasswordVisibility(true) }
    
    const classes = useStyles();

    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(LogInFormSchema),
        shouldFocusError: true,
    });
    const Submit = async (data: any) => {
        const response = await login(data);
        setSubmitted(true);
    };

    return (
        <React.Fragment>
            <DialogTitle className={classes.title}>Войти</DialogTitle>
            <DialogContent>
                <form className={classes.form}>
                    <Grid container className={classes.fieldset}>
                        <Grid container item xs={12} >
                            <FormInputField
                                label="Логин*"
                                placeholder="Введите адрес электронной почты или номер телефона"
                                fieldName="Email"
                                formSet={formSet}
                                extra={{className: classes.input,fullWidth:true}}
                            />
                        </Grid>
                        <Grid container item xs={12} >
                            <FormInputField
                                label="Пароль"
                                placeholder="Введите пароль"
                                fieldName="Password"

                                type={passwordVisibility ? "text" : "password"}
                                formSet={formSet}
                                extra={{
                                    className: classes.input,
                                    InputProps:{
                                        endAdornment:passwordAdornment(passwordVisibility,passwordVisibilityChange)},
                                    fullWidth:true
                                }
                                }
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
                            Войти
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </React.Fragment>
    );
};

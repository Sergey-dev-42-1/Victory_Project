//Форма регистрации
import React from "react";
import {useForm} from "react-hook-form";

import * as yup from "yup";
import {object, SchemaOf, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import {navigate} from "@reach/router";
import {register as axiosRegister} from "../API/mainServices";

import {FormInputField} from "./Elements/FormInputField";
import {FormBase} from "./Elements/FormBase";
import {User} from "../Additional/Types";
import {passwordAdornment} from "./Elements/PasswordVisibilityAdornment";
import {createStyles, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface FormFields {
    Email: string;
    Name: string;
    Password: string;
    PasswordCheck: string;
}

const useStyles = makeStyles((Theme) => createStyles({
    input: {
        marginBottom: "20px"
    }
}))

const OrgFormSchema: SchemaOf<FormFields> = object({
    Email: string()
        .email("Неверный E-mail адрес")
        .required("Поле необходимо заполнить")
        .defined(),
    Name: string()
        .max(200, "Слишком длинное название организации")
        .required("Поле необходимо заполнить")
        .defined(),
    Password: string()
        .min(8, "Длина пароля должна быть не менее 8 символов")
        .max(256, "Слишком длинный пароль")
        .required("Поле необходимо заполнить")
        .defined(),
    PasswordCheck: string()
        .oneOf([yup.ref("Password"), null], "Пароли не совпадают")
        .defined(),
}).defined();

export const RegistrationForm = () => {

    const [submitted, setSubmitted] = React.useState(false);
    const [passwordVisibility, setPasswordVisibility] = React.useState(false);

    const classes = useStyles();

    const passwordVisibilityChange = () => {
        passwordVisibility ? setPasswordVisibility(false)
            : setPasswordVisibility(true)
    }

    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(OrgFormSchema),
        shouldFocusError: true,
    });

    const Submit = async (formData: any) => {
        let user : User = {username: formData.Name, email:formData.Email,  password:formData.Password};

        let response = await axiosRegister(user);

        if (response.status === 200) {
            setSubmitted(true);
            navigate("./main");
        } else {
            alert("Произошла ошибка, попробуйте снова");
        }
        return;
    };

    React.useEffect(() => {
        if (formSet.formState.isSubmitSuccessful) {
            formSet.reset({
                Email: "",
                Name: "",
                Password: "",
                PasswordCheck: "",
            });
        }
    }, [formSet.formState, formSet, formSet.reset]);


    return (
        <FormBase
            formSet={formSet}
            SubmittedState={submitted}
            Submit={Submit}
        >
            <label className="formTitle">Зарегистрироваться</label>
            <Grid container>

                <FormInputField
                    label="Email"
                    placeholder="foobar@gmail.com"
                    fieldName="Email"
                    formSet={formSet}
                    extra={{
                        className: classes.input,
                        fullWidth: true,
                        inputProps: {autoComplete: "email"}
                    }}

                />
                <FormInputField
                    label="Имя пользователя"
                    placeholder="Никнейм или ФИО"
                    fieldName="Name"
                    formSet={formSet}
                    extra={{
                        className: classes.input,
                        fullWidth: true,
                        inputProps: {autoComplete: "username"}
                    }}

                />

                <FormInputField
                    label="Пароль"
                    placeholder="Введите пароль"
                    fieldName="Password"
                    type={passwordVisibility ? "text" : "password"}
                    formSet={formSet}
                    extra={{
                        className: classes.input,
                        inputProps: {autoComplete: "new-password"},
                        InputProps: {
                            endAdornment: passwordAdornment(passwordVisibility, passwordVisibilityChange)
                        },
                        fullWidth: true,

                    }}
                />

                <FormInputField
                    label="Подтвердите пароль"
                    fieldName="PasswordCheck"
                    type={passwordVisibility ? "text" : "password"}
                    formSet={formSet}
                    extra={{
                        className: classes.input,
                        InputProps: {
                            endAdornment: passwordAdornment(passwordVisibility, passwordVisibilityChange)
                        },
                        fullWidth: true,
                        inputProps: {autoComplete: "new-password"},
                    }}
                />
            </Grid>
        </FormBase>
    );
};

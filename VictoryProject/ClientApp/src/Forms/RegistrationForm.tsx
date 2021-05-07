//Форма регистрации
import React from "react";
import { useForm } from "react-hook-form";

import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { navigate } from "@reach/router";
import { register as axiosRegister } from "../API/mainServices";

import {InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import { FormInputField } from "./Elements/FormInputField";
import { FormBase } from "./Elements/FormBase";
import { User } from "../Additional/Types";

interface FormFields {
  Email: string;
  Name: string;
  Password: string;
  PasswordCheck: string;
}

const passwordAdornment = (passwordVisibility: boolean, passwordVisibilityChange: () => void) => {
  return (
  <InputAdornment position="end">
    <IconButton
        aria-label="toggle password visibility"
        onClick={passwordVisibilityChange}
    >
      {passwordVisibility ? <VisibilityOff/> : <Visibility/>}
    </IconButton>
  </InputAdornment>
)
}

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

  const passwordVisibilityChange = () => {passwordVisibility ? setPasswordVisibility(false) 
      : setPasswordVisibility(true) }
  
  const formSet = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(OrgFormSchema),
    shouldFocusError: true,
  });

  const Submit = async (formData: any) => {
    let user = new User(formData.Name, formData.Email, formData.Password);
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
          formStyle="inline"
          formSet={formSet}
          SubmittedState={submitted}
          Submit={Submit}
        >
          <label className="formTitle">Зарегистрироваться</label>

          <FormInputField
            label="Email"
            placeholder="foobar@gmail.com"
            fieldName="Email"
            formSet={formSet}
          />

          <FormInputField
            label="Имя пользователя"
            placeholder="Никнейм или ФИО"
            fieldName="Name"
            formSet={formSet}
          />

          <FormInputField
            label="Пароль"
            placeholder="Введите пароль"
            fieldName="Password"
            type={passwordVisibility ? "text":"password" }
            formSet={formSet}
            extra={{ endAdornment: 
              passwordAdornment(passwordVisibility,passwordVisibilityChange)
            }}
          />

          <FormInputField
            label="Подтвердите пароль"
            fieldName="PasswordCheck"
            type={passwordVisibility ? "text":"password" }
            formSet={formSet}
            extra={{ endAdornment:
                  passwordAdornment(passwordVisibility,passwordVisibilityChange)
            }}
          />
        </FormBase>
  );
};

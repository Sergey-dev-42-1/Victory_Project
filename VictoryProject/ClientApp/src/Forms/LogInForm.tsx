import React from "react";
import { useForm } from "react-hook-form";
import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "./Elements/FormInputField";
import { FormBase } from "./Elements/FormBase";
import {Button, IconButton, InputAdornment} from "@material-ui/core";
import { login } from "../API/mainServices";
import * as yup from "yup";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

interface FormFields {
  Email: string;
  Password: string;
}
const LogInFormSchema: SchemaOf<FormFields> = object({
  Email: string().required("Введите Email").defined(),
  Password: string().required("Введите пароль").defined(),
});
export const LogInForm = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  
  const formSet = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(LogInFormSchema),
    shouldFocusError: true,
  });
  const Submit = async (data: any) => {
    await login(data);
    setSubmitted(true);
  };

  return (
    <div className="logInForm">
      <FormBase
        formStyle="modal"
        formSet={formSet}
        buttons={<React.Fragment />}
        SubmittedState={submitted}
        Submit={Submit}
      >
        <div className="formTitle">Войти</div>

        <div className="formShapingContainer">
          <div className="fieldsContainer">
            <FormInputField
              label="Логин*"
              placeholder="Введите адрес электронной почты или номер телефона"
              fieldName="Email"
              formSet={formSet}
            />
            <FormInputField
                label="Пароль"
                placeholder="Введите пароль"
                fieldName="Password"
                type={passwordVisibility ? "text":"password" }
                formSet={formSet}
                extra={{ endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {passwordVisibility ? setPasswordVisibility(false) : setPasswordVisibility(true) }}

                        >
                          {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                }}
            />
          </div>
          <Button
            variant="outlined"
            disabled={formSet.formState.isSubmitting || submitted}
            formAction="drop"
          >
            Войти
          </Button>
        </div>
      </FormBase>
    </div>
  );
};

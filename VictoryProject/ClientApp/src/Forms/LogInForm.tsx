import React from "react";
import { useForm } from "react-hook-form";
import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "./Elements/FormInputField";
import { FormBase } from "../Forms/Elements/FormBase";
import * as yup from "yup";

interface FormFields {
  LogInCredential: string;
  Password: string;
  //TODO: Возможно добавить параметр роли, либо определять
  // автоматически по логину и давать возможность одному адресу играть только одну роль ?
}
const LogInFormSchema: SchemaOf<FormFields> = object({
  LogInCredential: string().required("Введите логин").defined(),
  Password: string().required("Введите пароль").defined(),
});
export const LogInForm = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const formSet = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(LogInFormSchema),
    shouldFocusError: true,
  });
  const Submit = async (data: FormData) => {
    console.log(data);
    // TODO: Имплементировать сброс на сервер
    setSubmitted(true);
  };
  const {
    register,

    formState: { errors },
  } = formSet;

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
              fieldName="LogInCredential"
              regist={register("LogInCredential")}
              errors={errors}
            />
            <FormInputField
              label="Пароль*"
              placeholder="Введите пароль"
              type="password"
              fieldName="Password"
              regist={register("Password")}
              errors={errors}
            />
          </div>
          <button className="submitButton">Войти</button>
        </div>
      </FormBase>
    </div>
  );
};

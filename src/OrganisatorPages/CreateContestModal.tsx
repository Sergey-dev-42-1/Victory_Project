import React from "react";
import { FormInputField } from "../Forms/FormInputField";
import { useForm } from "react-hook-form";
import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
interface FormFields {
  Email: string;
  OrgName: string;
  Password: string;
  PasswordCheck: string;
}

export const CreateContestModal = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const OrgFormSchema: SchemaOf<FormFields> = object({
    Email: string()
      .email("Неверный E-mail адрес")
      .required("Поле необходимо заполнить")
      .defined(),
    OrgName: string()
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(OrgFormSchema),
    shouldFocusError: true,
  });
  const Submit = async (data: FormFields) => {
    console.log(data);
    // TODO: Имплементировать сброс на сервер
    setSubmitted(true);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(Submit)} className="formContainer">
        <div className="formTitle">Создать конкурс</div>
        <div className="formShapingContainer">
          <div className="fieldsContainer">
            <FormInputField
              label="Email организации"
              fieldName="Email"
              regist={register("Email")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Email организации"
              fieldName="Email"
              regist={register("Email")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Email организации"
              fieldName="Email"
              regist={register("Email")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Email организации"
              fieldName="Email"
              regist={register("Email")}
              errors={errors}
            ></FormInputField>
          </div>
          <div className="buttonsContainer">
            <button formAction="submit" className="submitButton">
              Создать
            </button>
            <button
              disabled={formState.isSubmitting || submitted}
              formAction="drop"
              className="submitButton"
            >
              Отмена
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

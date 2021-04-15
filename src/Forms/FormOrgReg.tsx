//Форма регистрации организатора
import { useForm } from "react-hook-form";
import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "./FormInputField";
import * as yup from "yup";
import React from "react";
interface FormFields {
  Email: string;
  OrgName: string;
  Password: string;
  PasswordCheck: string;
}

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

export const FormOrgReg = () => {
  const [submitted, setSubmitted] = React.useState(false);

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
  React.useEffect(() => {
    console.log(errors);
  }, [errors]);
  //TODO: Создать компонент, который бы являлся базисом для всех трех форм
  return (
    <div className="RegPageContainer">
      <div className="textContainer">
        Victory - сервис, позволящий организовать и провести конкурс с минимум
        усилий, для всех участников процесса: организаторов, экспертов и
        участников
      </div>
      <main className="outerFormContainer">
        <form className="FormContainer" onSubmit={handleSubmit(Submit)}>
          <label className="formTitle">
            Зарегистрироваться как организатор
          </label>
          <FormInputField
            label="Email организации"
            fieldName="Email"
            regist={register("Email")}
            errors={errors}
          />

          <FormInputField
            label="Название организации"
            fieldName="OrgName"
            regist={register("OrgName")}
            errors={errors}
          />

          <FormInputField
            label="Пароль"
            fieldName="Password"
            regist={register("Password")}
            type="password"
            errors={errors}
          />

          <FormInputField
            label="Подтвердите пароль"
            fieldName="PasswordCheck"
            regist={register("PasswordCheck")}
            type="password"
            errors={errors}
          />

          <button
            className="submitButton"
            type="submit"
            disabled={formState.isSubmitting || submitted}
          >
            Отправить
          </button>
        </form>
      </main>
    </div>
  );
};

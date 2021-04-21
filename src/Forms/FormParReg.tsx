//Форма регистрации организатора
import { useForm } from "react-hook-form";
import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "./Elements/FormInputField";
import * as yup from "yup";
import React from "react";
interface FormFields {
  Email: string;
  FirstName: string;
  Password: string;
  PasswordCheck: string;
}

const ExpFormSchema: SchemaOf<FormFields> = object({
  Email: string()
    .email("Неверный E-mail адрес")
    .required("Поле необходимо заполнить")
    .defined(),
  FirstName: string()
    .max(64, "Слишком длинное имя")
    .required("Поле необходимо заполнить")
    .defined(),
  Patronymic: string()
    .max(64, "Слишком длинное отчество")
    .required("Поле необходимо заполнить")
    .defined(),
  LastName: string()
    .max(64, "Слишком длинная фамилия")
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

export const FormParReg = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(ExpFormSchema),
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

  return (
    <div className="RegPageContainer">
      <div className="textContainer">
        Victory - сервис, позволящий организовать и провести конкурс с минимум
        усилий, для всех участников процесса: организаторов, экспертов и
        участников
      </div>
      <form className="FormContainer" onSubmit={handleSubmit(Submit)}>
        <label className="formTitle">Зарегистрироваться как участник</label>
        <FormInputField
          label="Email"
          fieldName="Email"
          regist={register("Email")}
          errors={errors}
        />
        <FormInputField
          label="Фамилия"
          fieldName="LastName"
          regist={register("LastName")}
          errors={errors}
        />
        <FormInputField
          label="Имя"
          fieldName="FirstName"
          regist={register("FirstName")}
          errors={errors}
        />

        <FormInputField
          label="Отчество"
          fieldName="Patronymic"
          regist={register("Patronymic")}
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
    </div>
  );
};

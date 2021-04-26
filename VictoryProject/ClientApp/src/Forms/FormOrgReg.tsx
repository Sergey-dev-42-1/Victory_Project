//Форма регистрации организатора
import { useForm } from "react-hook-form";
import { string, object, SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputField } from "./Elements/FormInputField";
import { FormBase } from "../Forms/Elements/FormBase";
import { register as axiosRegister } from "../API/mainServices";
import * as yup from "yup";
import React from "react";
import { navigate, Redirect, useNavigate } from "@reach/router";
import { User } from "../Additional/Types";
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

  const formSet = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(OrgFormSchema),
    shouldFocusError: true,
  });

  const {
    register,
    formState: { errors },
  } = formSet;

  const Submit = async (formData: any) => {
    let user = new User(formData.OrgName, formData.Email, formData.Password);
    let response = await axiosRegister(user);
    if (response.status === "200") {
      setSubmitted(true);
      navigate("./main");
    } else {
      alert("Произошла ошибка, попробуйте снова");
    }
    return;
  };
  React.useEffect(() => {}, []);
  //TODO: Создать компонент, который бы являлся базисом для всех трех форм
  return (
    <div className="RegPageContainer">
      <div className="regContentContainer">
        <div className="textContainer">
          Victory - сервис, позволящий организовать и провести конкурс с минимум
          усилий, для всех участников процесса: организаторов, экспертов и
          участников
        </div>

        <FormBase
          formStyle="inline"
          formSet={formSet}
          SubmittedState={submitted}
          Submit={Submit}
        >
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
        </FormBase>
      </div>
    </div>
  );
};

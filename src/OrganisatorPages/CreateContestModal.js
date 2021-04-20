import React from "react";
import { FormInputField } from "../Forms/FormInputField";
import { useForm } from "react-hook-form";
import { string, object, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

export const CreateContestModal = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const CreateContestSchema = object({
    name: string()
      .max(50, "Слишком длинное название конкурса")
      .required("Поле необходимо заполнить")
      .defined(),
    notes: string().max(200, "Достигнут предел длины примечаний").defined(),
    dateBeginning: date()
      .min(new Date(Date.now()), "Нельзя создать конкурс в прошлом :)")
      .nullable()
      .typeError("Заполните поле")
      .required("Укажите дату начала конкурса")
      .defined(),
    dateEnding: date()
      .min(
        yup.ref("dateBeginning"),
        "Дата окончания не может быть раньше начала"
      )
      .required("Укажите дату окончания конкурса")
      .nullable()
      .typeError("Заполните поле")
      .defined(),
    applyDateBeginning: date()
      .min(
        yup.ref("dateBeginning"),
        "Нельзя установить начало приема заявок ранее начала конкурса"
      )
      .max(
        yup.ref("dateEnding"),
        "Нельзя установить прием заявок позднее окончания конкурса"
      )
      .required("Укажите дату начала приема заявок на конкурс")
      .nullable()
      .typeError("Заполните поле")
      .defined(),
    applyDateEnding: date()
      .min(
        yup.ref("applyDateBeginning"),
        "Нельзя установить окончание приема заявок ранее начала приема"
      )
      .max(
        yup.ref("dateEnding"),
        "Нельзя установить окончание приема заявок позднее окончания конкурса"
      )
      .required("Укажите дату начала приема заявок на конкурс")
      .required("Укажите дату окончания приема заявок на конкурс")
      .nullable()
      .typeError("Заполните поле")
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
    resolver: yupResolver(CreateContestSchema),
    shouldFocusError: true,
  });
  const Submit = async (data) => {
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
              label="Название конкурса*"
              fieldName="contestName"
              regist={register("contestName")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Описание конкурса"
              fieldName="notes"
              type="text"
              regist={register("notes")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Дата начала*"
              fieldName="dateBeginning"
              type="datetime-local"
              regist={register("dateBeginning")}
              errors={errors}
            ></FormInputField>

            <FormInputField
              label="Дата окончания конкурса*"
              fieldName="dateEnding"
              type="datetime-local"
              regist={register("dateEnding")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Дата начала приема заявок*"
              fieldName="applyDateBeginning"
              type="datetime-local"
              regist={register("applyDateBeginning")}
              errors={errors}
            ></FormInputField>
            <FormInputField
              label="Дата окончания приема заявок*"
              fieldName="applyDateEnding"
              type="datetime-local"
              regist={register("applyDateEnding")}
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

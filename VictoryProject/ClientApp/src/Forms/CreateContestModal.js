import React from "react";

import { useForm } from "react-hook-form";
import { string, object, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContest } from "../API/mainServices";

import * as yup from "yup";

import { FormInputField } from "./Elements/FormInputField";
import { FormBase } from "../Forms/Elements/FormBase";
import { Contest } from "../Additional/Types";
import { Button } from "@material-ui/core";

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
  const formSet = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(CreateContestSchema),
    shouldFocusError: true,
  });
  const Submit = async (data) => {
    await createContest(data);

    setSubmitted(true);
  };
  //TODO: переписать с использованием formBase
  return (
    <React.Fragment>
      <FormBase
        formStyle="modal"
        formSet={formSet}
        buttons={<React.Fragment />}
        SubmittedState={submitted}
        Submit={Submit}
      >
        <div className="formShapingContainer">
          <div className="fieldsContainer">
            <FormInputField
              label="Название конкурса*"
              fieldName="name"
              formSet={formSet}
            ></FormInputField>
            <FormInputField
              label="Описание конкурса"
              fieldName="notes"
              type="text"
              formSet={formSet}
            ></FormInputField>
            <FormInputField
              label="Дата начала*"
              fieldName="dateBeginning"
              type="datetime-local"
              formSet={formSet}
            ></FormInputField>

            <FormInputField
              label="Дата окончания конкурса*"
              fieldName="dateEnding"
              type="datetime-local"
              formSet={formSet}
            ></FormInputField>
            <FormInputField
              label="Дата начала приема заявок*"
              fieldName="applyDateBeginning"
              type="datetime-local"
              formSet={formSet}
            ></FormInputField>
            <FormInputField
              label="Дата окончания приема заявок*"
              fieldName="applyDateEnding"
              type="datetime-local"
              formSet={formSet}
            ></FormInputField>
          </div>
          <div className="buttonsContainer">
            <Button
              variant="outlined"
              disabled={formSet.formState.isSubmitting || submitted}
              formAction="drop"
              className="submitButton"
            >
              Создать
            </Button>
            <button formAction="submit" className="submitButton"></button>
          </div>
        </div>
      </FormBase>
    </React.Fragment>
  );
};

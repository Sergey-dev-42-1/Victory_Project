import React from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface Props {
  children: JSX.Element[] | JSX.Element;
  formSet: UseFormReturn<FieldValues>;
  SubmittedState: boolean;
  formStyle: "inline" | "modal";
  Submit: (data: FormData) => Promise<any>;
  buttons?: JSX.Element[] | JSX.Element;
}
export const FormBase = ({
  children,
  formSet,
  formStyle,
  buttons,
  Submit,
  SubmittedState,
}: Props) => {
  return (
    <form
      className={formStyle === "modal" ? "modalFormContainer" : "formContainer"}
      onSubmit={formSet.handleSubmit(Submit)}
    >
      {children}
      {buttons === undefined ? (
        <button
          className="submitButton"
          type="submit"
          disabled={formSet.formState.isSubmitting || SubmittedState}
        >
          Отправить
        </button>
      ) : (
        buttons
      )}
    </form>
  );
};

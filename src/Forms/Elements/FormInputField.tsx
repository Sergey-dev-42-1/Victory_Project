import React from "react";
//Компонент добавляющий поле в форму
// Regist - объект с параметрами от react-hook-form необходимый для регистрации поля в форме
interface Props {
  label: string;
  fieldName: string;
  regist: any;
  errors: any;
  placeholder?: string;
  type?: string;
}

export const FormInputField = (props: Props) => {
  console.log(props);
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <input
        style={props.errors[props.fieldName] ? { borderColor: "#ca2f2f" } : {}}
        className="formInput"
        id={props.fieldName}
        placeholder={props.placeholder ?? props.label}
        type={props.type ?? "text"}
        {...props.regist}
      />
      {props.errors[props.fieldName]?.message && (
        <p className="errorValidation">
          {props.errors[props.fieldName]?.message}
        </p>
      )}
    </React.Fragment>
  );
};

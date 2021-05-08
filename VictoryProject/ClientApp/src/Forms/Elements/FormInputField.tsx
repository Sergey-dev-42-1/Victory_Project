import React from "react";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
//Компонент добавляющий поле в форму
// Regist - объект с параметрами от react-hook-form необходимый для регистрации поля в форме
interface Props {
  label: string;
  fieldName: string;
  formSet: any;
  placeholder?: string;
  type?: string;
  //Дополнительное поле для кастомизации TextField
  extra?: {};
}

export const FormInputField = (props: Props) => {
  const {
    formState: { errors },
  } = props.formSet;

  return (
    <React.Fragment>
      <Controller
        name={props.fieldName}
        control={props.formSet.control}
        defaultValue=""
        render={({ field: { onChange, onBlur, ref } }) => (
          <TextField
            variant="outlined"
            label={props.label}
            id={props.fieldName}
            placeholder={props.placeholder ?? props.label}
            type={props.type ?? "text"}
            error={errors[props.fieldName] !== undefined}
            helperText={errors[props.fieldName]?.message}
            onChange={(value: any) => onChange(value)}
            onBlur={onBlur}
            inputRef={ref}
            {...props.extra}
          />
        )}
      />
    </React.Fragment>
  );
};

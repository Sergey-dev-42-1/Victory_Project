import React from "react";
import {Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {Controller} from "react-hook-form";

//Компонент добавляющий поле в форму

interface Props {
    label: string;
    fieldName: string;
    formSet: any;
    placeholder?: string;
    id?: number;
    type?: string;
    //Дополнительное поле для кастомизации TextField
    extra?: {};
}

export const FormInputField = (props: Props) => {
    const {
        formState: {errors},
    } = props.formSet;
    console.log(errors)
    return (
        <React.Fragment>
            <Controller
                name={props.id ? props.id.toString() : props.fieldName}
                control={props.formSet.control}

                render={({field: {onChange, onBlur, ref}}) => {
                    return (
                        props.type === "checkbox" ? (
                            <FormControlLabel
                                control={<Checkbox onChange={onChange}
                                                   inputRef={ref}
                                                   name={props.fieldName}/>}
                                label={props.label}
                            />
                        ) : (<TextField
                            variant="outlined"
                            label={props.label}
                            id={props.id ? props.id.toString() : props.fieldName}
                            placeholder={props.placeholder ?? props.label}
                            type={props.type ?? "text"}
                            error={errors[props.id ? props.id.toString() : props.fieldName] !== undefined}
                            helperText={errors[props.id ? props.id.toString() : props.fieldName]?.message}
                            onChange={(value: any) => onChange(value)}
                            onBlur={onBlur}
                            inputRef={ref}
                            {...props.extra}
                        />)
                    )
                }}
            />
        </React.Fragment>
    );
};

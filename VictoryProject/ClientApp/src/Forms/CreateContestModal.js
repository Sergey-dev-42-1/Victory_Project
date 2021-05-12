import React from "react";

import {useForm} from "react-hook-form";
import {string, object, date} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {createContest} from "../API/mainServices";

import * as yup from "yup";

import {FormInputField} from "./Elements/FormInputField";

import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    createStyles,
  Divider
} from "@material-ui/core";


const useStyles = makeStyles((Theme) => createStyles({
    title:{
        color:Theme.palette.getContrastText(Theme.palette.primary.main),
      backgroundColor:Theme.palette.primary.main
    },
    form: {
        height: "400px",
        display: "flex",
        justifyContent: "space-around",
        flexFlow: "column nowrap"
    },
    inputPair: {
        justifyContent: "space-between"
    }
}))
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

export const CreateContestModal = (props) => {
    
    const [submitted, setSubmitted] = React.useState(false);

    const classes = useStyles();

    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(CreateContestSchema),
        shouldFocusError: true,
    });
    
    const Submit = async (data) => {
        console.log("submitted")
        await createContest(data);

        setSubmitted(true);
    };

    React.useEffect(() => {
        if (formSet.formState.isSubmitSuccessful) {
            formSet.reset({
                name: "",
                notes: "",
                dateBeginning: "",
                dateEnding: "",
                applyDateBeginning: "",
                applyDateEnding: "",
            });
        }
    }, [formSet.formState, formSet, formSet.reset]);

    return (
        <React.Fragment>
            <DialogTitle className={classes.title}>Создать конкурс</DialogTitle>
            <Divider/>
            <DialogContent>
                <form className={classes.form} onSubmit={formSet.handleSubmit(Submit)}>

                    <FormInputField
                        label="Название конкурса*"
                        fieldName="name"
                        formSet={formSet}

                    />
                    <FormInputField
                        label="Описание конкурса"
                        fieldName="notes"
                        formSet={formSet}

                    />
                    <Grid container className={classes.inputPair}>
                        <Grid container item xs={6} spacing={1}>
                            <FormInputField
                                label="Дата начала*"
                                fieldName="dateBeginning"
                                type="datetime-local"
                                formSet={formSet}
                                extra={{InputLabelProps: { shrink: true } }}
                            />
                        </Grid>
                        <Grid container item  xs={6} spacing={1}>
                            <FormInputField
                                label="Дата окончания конкурса*"
                                fieldName="dateEnding"
                                type="datetime-local"
                                formSet={formSet}
                                extra={{InputLabelProps: { shrink: true } }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.inputPair}>
                        <Grid container item  xs={6} spacing={1}>
                            <FormInputField
                                label="Дата начала приема заявок*"
                                fieldName="applyDateBeginning"
                                type="datetime-local"
                                formSet={formSet}
                                extra={{InputLabelProps: { shrink: true } }}
                            />
                        </Grid>
                        <Grid container item xs={6} spacing={1}>
                            <FormInputField
                                label="Дата окончания приема заявок*"
                                fieldName="applyDateEnding"
                                type="datetime-local"
                                
                                formSet={formSet}
                                extra={{InputLabelProps: { shrink: true } }}
                            />
                        </Grid>
                    </Grid>

                    <DialogActions>
                        <Button
                            disabled={formSet.formState.isSubmitting || submitted}
                            variant="contained"
                            type="submit"
                        >
                            Создать
                        </Button>
                        <Button onClick={props.close}
                                variant="contained"

                        >Отмена</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </React.Fragment>
    );
};

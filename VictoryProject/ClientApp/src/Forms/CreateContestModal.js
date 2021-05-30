import React from "react";

import {useForm} from "react-hook-form";
import * as yup from "yup";
import {date, object, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {createContest} from "../API/mainServices";

import {FormInputField} from "./Elements/FormInputField";

import {
    Button,
    createStyles,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    makeStyles
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
    Name: string()
        .max(40, "Слишком длинное название конкурса")
        .required("Поле необходимо заполнить")
        .defined(),
    Comment: string().max(200, "Достигнут предел длины примечаний").defined(),
    StartDate: date()
        .min(new Date(Date.now()), "Нельзя создать конкурс в прошлом :)")
        .nullable()
        .typeError("Заполните поле")
        .required("Укажите дату начала конкурса")
        .defined(),
    EndDate: date()
        .min(
            yup.ref("StartDate"),
            "Дата окончания не может быть раньше начала"
        )
        .required("Укажите дату окончания конкурса")
        .nullable()
        .typeError("Заполните поле")
        .defined(),
    StartRegistrationDate: date()
        .min(
            yup.ref("StartDate"),
            "Нельзя установить начало приема заявок ранее начала конкурса"
        )
        .max(
            yup.ref("EndDate"),
            "Нельзя установить прием заявок позднее окончания конкурса"
        )
        .required("Укажите дату начала приема заявок на конкурс")
        .nullable()
        .typeError("Заполните поле")
        .defined(),
    EndRegistrationDate: date()
        .min(
            yup.ref("StartRegistrationDate"),
            "Нельзя установить окончание приема заявок ранее начала приема"
        )
        .max(
            yup.ref("EndDate"),
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
        setSubmitted(true);
        await createContest(data);
        props.close()
    };

    React.useEffect(() => {
        if (formSet.formState.isSubmitSuccessful) {
            formSet.reset({
                Name: "",
                Comment: "",
                StartDate: "",
                EndDate: "",
                StartRegistrationDate: "",
                EndRegistrationDate: "",
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
                        fieldName="Name"
                        formSet={formSet}

                    />
                    <FormInputField
                        label="Описание конкурса"
                        fieldName="Comment"
                        formSet={formSet}

                    />
                    <Grid container className={classes.inputPair}>
                        <Grid container item xs={6} spacing={1}>
                            <FormInputField
                                label="Дата начала*"
                                fieldName="StartDate"
                                type="datetime-local"
                                formSet={formSet}
                                extra={{InputLabelProps: { shrink: true } }}
                            />
                        </Grid>
                        <Grid container item  xs={6} spacing={1}>
                            <FormInputField
                                label="Дата окончания конкурса*"
                                fieldName="EndDate"
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
                                fieldName="StartRegistrationDate"
                                type="datetime-local"
                                formSet={formSet}
                                extra={{InputLabelProps: { shrink: true } }}
                            />
                        </Grid>
                        <Grid container item xs={6} spacing={1}>
                            <FormInputField
                                label="Дата окончания приема заявок*"
                                fieldName="EndRegistrationDate"
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

import React from "react";
import {UseFormReturn} from "react-hook-form";
import {Button, Paper, makeStyles} from "@material-ui/core";

interface Props {
    children: JSX.Element[] | JSX.Element;
    formSet: UseFormReturn;
    SubmittedState: boolean;
    formStyle: "inline" | "modal";
    Submit: (data: FormData) => Promise<any>;
    buttons?: JSX.Element[] | JSX.Element;
}

const useStyles = makeStyles({
    formOuter: {
        display: "inherit",
        flexGrow: 1
    },
    formInner: {
        display: "flex",
        justifyContent: "space-between",
        padding: "30px 20px",
        flexDirection: "column",
        flexFlow: "wrap",
        flexGrow: 1
    }
})

export const FormBase = ({
                             children,
                             formSet,
                             formStyle,
                             buttons,
                             Submit,
                             SubmittedState,
                         }: Props) => {
    const classes = useStyles();
    return (
        <Paper elevation={6} square className={formStyle === "modal" ? "modalFormContainer" : "formContainer"}>
            <form
                className={classes.formOuter}
                onSubmit={formSet.handleSubmit(Submit)}
            >
                <Paper elevation={12} className={classes.formInner}>
                    {children}
                    {buttons === undefined ? (
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={formSet.formState.isSubmitting || SubmittedState}
                        >
                            Отправить
                        </Button>
                    ) : (
                        buttons
                    )}
                </Paper>
            </form>
        </Paper>
    );
};

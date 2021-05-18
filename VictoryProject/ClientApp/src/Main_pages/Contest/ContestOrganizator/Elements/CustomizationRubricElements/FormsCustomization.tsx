import {
    Box,
    Button,
    createMuiTheme,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
    useTheme
} from "@material-ui/core";
import {FormInputField} from "../../../../../Forms/Elements/FormInputField";
import React, {useState} from "react";
import {darkTheme} from "../../../../../MaterialUI/Themes";
import {useAppSelector} from "../../../../../hooks/ReduxHooks";
import {selectDarkTheme} from "../../../../../state/themeSlice";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup";
import {RouteComponentProps} from "@reach/router";

const colorSchema = object({
    primary: string().required("Выберите новый цвет").defined(),
    secondary: string().required("Выберите новый цвет").defined()
})


const useStyles = makeStyles((Theme) => createStyles({
    formChangeContainer: {
        padding: Theme.spacing(2),
        border: "2px solid rgba(0,0,0,0.33)",
        borderRadius: "2%",
        margin: "0 30px"
    },
    formTitle: {
        padding:"0 10px",
        textAlign: "center",
        marginTop: -Theme.spacing(4),
        paddingBottom: Theme.spacing(2.5)
    },
    formsRoot: {},
    formButtonContainer: {
        alignItems: "center"
    },
    titleContainer: {
        backgroundColor: Theme.palette.background.default,
        width: "fit-content"
    },
}))

export const FormsCustomization = () => {

    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(colorSchema),
        shouldFocusError: true,
    });

    const classes = useStyles();

    return (
        <Box p={3} style={{marginTop: "20px"}}>
            <Grid container className={classes.formsRoot}>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Заявка участника</Typography>
                    </div>
                    <Grid container spacing={3} className={classes.formButtonContainer}>
                        <Grid item>
                            <Button variant={"contained"} color={"secondary"}>Просмотр/Изменение</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.formChangeContainer}>
                    <div className={classes.titleContainer}>
                        <Typography className={classes.formTitle}>Оценка работы</Typography>
                    </div>
                    <Grid container spacing={3} className={classes.formButtonContainer}>
                        <Grid item>
                            <Button variant={"contained"} color={"secondary"}>Просмотр/Изменение</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    )
}

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

interface Props {
    setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const useStyles = makeStyles((Theme) => createStyles({
    colorForm: {
        padding: Theme.spacing(2),
        border: "1px solid rgba(0,0,0,0.33)",
    },
    formTitle:{
        marginTop: -Theme.spacing(5),
        paddingBottom:Theme.spacing(2.5)
    },
    formButtonContainer: {
        alignItems: "center"
    },
})) 

export const ColorCustomization = ({setTheme}:Props) => {

    const theme = useTheme();
    const [colors, setColors] = useState({primary:theme.palette.primary.main, secondary: theme.palette.secondary.main});

    function handlePrimaryChange(e: React.FormEvent<HTMLInputElement>){

        setColors({primary: e.currentTarget.value, secondary: colors.secondary})
    }
    function handleSecondaryChange(e: React.FormEvent<HTMLInputElement>){

        setColors({primary:colors.primary, secondary: e.currentTarget.value })
    }
    const formSet = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(colorSchema),
        shouldFocusError: true,
    });
    const mode = useAppSelector(selectDarkTheme)
    const classes = useStyles();
    function handleColorSubmit(data: any) {
        setTheme( mode ? darkTheme :
            createMuiTheme({...theme,  palette: {
                    ...theme.palette,
                    primary: {
                        main: data.primary,
                    },
                    secondary: {
                        main: data.secondary
                    }
                },}))
    }
    return(
        <Box p={3} style={{marginTop: "20px"}}>
            <form className={classes.colorForm}>
                <Typography className={classes.formTitle}>Основные цвета</Typography>
                <Grid container spacing={3} className={classes.formButtonContainer}>
                    <Grid item>
                        <FormInputField
                            extra={{
                                inputProps: {
                                    style: {minWidth: "100px"},
                                    onChange: handlePrimaryChange,
                                    value: colors.primary
                                }, style: {minWidth: "100px"}
                            }}
                            label={"Основной цвет"} fieldName={"primary"} formSet={formSet} type={"color"}/>
                    </Grid>
                    <Grid item>
                        <FormInputField
                            extra={{
                                inputProps: {
                                    style: {minWidth: "100px"},
                                    onChange: handleSecondaryChange,
                                    value: colors.secondary
                                }, style: {minWidth: "100px"}
                            }}
                            label={"Вторичный цвет"} fieldName={"secondary"} formSet={formSet}
                            type={"color"}/>
                    </Grid>
                    <Grid item>
                        <Button variant={"contained"} color={"secondary"}
                                onClick={formSet.handleSubmit(handleColorSubmit)}>Сохранить</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}
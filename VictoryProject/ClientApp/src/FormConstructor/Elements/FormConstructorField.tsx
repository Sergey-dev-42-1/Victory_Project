import {Box, Button, Card, CardContent, createStyles, IconButton, makeStyles, TextField} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import {FormInputField} from "../../Forms/Elements/FormInputField";
import {schemaConstructor}  from "../../Additional/yupSchemaConstructor";
import {object, SchemaOf, string} from "yup";
import {ApplicationField, HTMLInputTypes} from "../../Additional/Types";
import {Typography} from "@material-ui/core/";
import React from "react";
import {StringLayout} from "./FormFieldLayouts/StringLayout";
import {NumberLayout} from "./FormFieldLayouts/NumberLayout";
import * as yup from "yup";
import {CheckBoxLayout} from "./FormFieldLayouts/CheckboxLayout";
import {FileLayout} from "./FormFieldLayouts/FileLayout";
const useStyles = makeStyles((Theme) => createStyles({

    ButtonContainer: {
        display:"flex",
        paddingTop:"8px",
        justifyContent: "space-between"
    },
    inputCard: {
        padding: Theme.spacing(2),
        justifyContent: "space-between",
        height: "150px",
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },

    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: Theme.spacing(1),
        paddingBottom: Theme.spacing(1),
    },

}))

const fieldOptions= [{value:HTMLInputTypes.text,label:"Текст"},{value:HTMLInputTypes.number,label:"Число"},
    {value:HTMLInputTypes.email,label:"E-mail"},{value:HTMLInputTypes.tel,label:"Телефон"}, {value:HTMLInputTypes.checkbox,label:"Да/Нет"},
    {value:HTMLInputTypes.file,label:"Файл"},{value:HTMLInputTypes.url,label:"Ссылка"}]

const chooseLayout = (item:ApplicationField, constraints: (constraints:any)=>void) => {
    switch (item.type) {
        case HTMLInputTypes.text:
            return <StringLayout item={item} sendConstraints={constraints}/>
        
        case HTMLInputTypes.number:
            return <NumberLayout item={item} sendConstraints={constraints}/>
        case HTMLInputTypes.checkbox:
            return <CheckBoxLayout item={item} sendConstraints={constraints}/>
        case HTMLInputTypes.file:
            return <FileLayout/>

    }
}

interface Props {
    item: ApplicationField,
    deleteSelf: (id:number)=> void
    returnData: (value: ApplicationField) => void
}


export const FormConstructorField = ({returnData,item, deleteSelf}:Props) => {
    const classes = useStyles()

    const [field, setField] = React.useState(item)
    
    function deleteFieldHandler() {
        deleteSelf(item.id)
    }

    function handleChangeFieldType(event:any) {
        setField({...field, constraints:{}, type:event.currentTarget.value})
        returnData({...field, constraints:{}, type:event.currentTarget.value})
    }
    function handleNameChange(event:any) {
        setField({...field, name:event.currentTarget.value})
        returnData({...field, name:event.currentTarget.value})
    }
    function handleConstraintsChange(constraints:any) {
        setField({...field, constraints:constraints})
        returnData({...field, constraints:constraints})
    }

    return(
        <Box p={3}>
            <Card elevation={4} className={classes.inputCard}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <TextField required onChange={handleNameChange} value={field.name} label="Название поля" placeholder={"Введите название"} />
                    </CardContent>
                </div>
                {chooseLayout(field, handleConstraintsChange)}
                <div className={classes.controls} >
                   
                        <TextField
                            select
                            label="Тип поля"
                            value={field.type}
                            onChange={handleChangeFieldType}
                            SelectProps={{
                            native: true,
                        }}
                            helperText="Выберите тип поля"
                            variant="outlined"
                            >
                            {fieldOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                </TextField>
                </div>
            </Card>
            <Box className={classes.ButtonContainer}>
                <Button startIcon={<RemoveIcon />} onClick={deleteFieldHandler} variant={"contained"}>Удалить</Button>
            </Box>
        </Box>
    )
}
import {Box, createStyles, makeStyles} from "@material-ui/core";
import {FormConstructorField} from "./Elements/FormConstructorField";
import {Button} from "@material-ui/core/";
import AddIcon from '@material-ui/icons/Add';
import React from "react";
import {ApplicationField, HTMLInputTypes} from "../Additional/Types";

const useStyles = makeStyles((Theme) => createStyles({

    ButtonContainer: {
        display:"flex",
        paddingTop:"8px",
        justifyContent: "flex-end"
    },
}))
//Создание ключей для полей, важная штука для Реакта, если каждый элемент ренедеренной коллекции не будет иметь уникального ключа,
//могут начаться проблемы с рендером

const findFreeId = (items:ApplicationField[])=>{
    
    if(items.length === 0){
        return 0
    }
    for(let id = 1; id < 1000; id++){
        const searchSuccessful = items.find((item)=>{
            return item.id === id
        })
        if(!searchSuccessful){
            return id
        }
    }
    return -1
   
}
interface Props {
    saveData: (fields:ApplicationField[]) => void
}

export const FormConstructor =({saveData}:Props) => {
    const classes = useStyles();
    //Почему id дефолта не 0? в функции которая выдает id-шники(которые также идут в Key), 
    // и если они пересекутся с дефолтом, Реакт подумает что 
    //что я его обманываю и подсовываю ему тот же объект и не станет его обновлять 
    const defaultVal =  {id:1001,name:"123",constraints:{},required:true,type:HTMLInputTypes.text} as ApplicationField
    
    const [fields,setFields] = React.useState([defaultVal])
    
    
    function addFieldHandler() {
        setFields([...fields,{...defaultVal, id: findFreeId(fields)}])
        saveData([...fields, {...defaultVal, id: findFreeId(fields)}])
    }
    const deleteFieldHandler = (id:number)=>{
        const update = fields.filter((item)=>{
            return item.id !== id
        })
        setFields(update)
        saveData(update)
    }
    const handleReturnData = (field: ApplicationField) => {
        const index = fields.findIndex((item)=>{return item.id === field.id})
        if (index !== -1){
            const updatedFields = fields
            updatedFields[index] = field
            setFields(updatedFields)
            saveData(updatedFields)
            return
        }
        setFields([...fields, field])
        saveData([...fields, field])
    }
    React.useEffect(()=>{

        saveData(fields)
        let items = window.localStorage.getItem("testForm")

        let fieldsJSON = items ? JSON.parse(items) : ""
        if(fieldsJSON) {console.log("setting from JSON");setFields(fieldsJSON)}

    },[])

    return(
        <Box p={3}>
            {fields.map((item)=>{
                console.log(item)
               return <FormConstructorField item={item} returnData={handleReturnData} deleteSelf={deleteFieldHandler} key={item.id}/>
            })}
            
            <Box className={classes.ButtonContainer}>
                <Button startIcon={<AddIcon />} onClick={addFieldHandler} variant={"contained"}>Добавить</Button>
            </Box>
            
        </Box>
    )   
}
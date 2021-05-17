import {Application, ApplicationField, HTMLInputTypes} from "./Types"
import * as yup from "yup";

import {ObjectShape} from "yup/lib/object";

export const schemaConstructor = (Application: Application) => {
    const fields = Application.fields

    let FormSchema = yup.object({});

    fields.forEach((item: ApplicationField) => {
        const newSchemaField = schemaDefiner(item)
        let shapeObject: ObjectShape = {};


        shapeObject[item.name] = newSchemaField

        FormSchema = FormSchema.shape(shapeObject)

    })

    return FormSchema
}

function schemaDefiner(item: ApplicationField) {

    let itemSchema = yup.mixed();
    
    
    switch (item.type) {
        case HTMLInputTypes.text:
            itemSchema = yup.string()

            break;
        case HTMLInputTypes.number:
            itemSchema = yup.number()

            break;
        case HTMLInputTypes.checkbox:
            itemSchema = yup.boolean()
            break;
        //Даты хоть и прописаны но валидации по максимуму/минимуму для них не будет
        case HTMLInputTypes.date:
            itemSchema = yup.date()
            break;
        case HTMLInputTypes.dateTimeLocal:
            itemSchema = yup.date()
            break;

    }
    //Устанавливаем лимит на числовых и строковых значениях 
    if (itemSchema instanceof yup.StringSchema) {
        itemSchema = item.limit ? itemSchema
            .max(item.limit, `Слишком длинное значение ${item.name}, максимум: ${item.limit}`) : itemSchema

    }
    //По какой-то неведомой мне тайпскриптной причине, проверка  на instanceof (что-то) подтверждает  что это (что-то), только один раз
    //Проверка на >0 если число
    if(itemSchema instanceof yup.NumberSchema){itemSchema = itemSchema.min(0,'Значение должно быть положительным')}
    //Проверка на < максимума если число
    if (itemSchema instanceof yup.NumberSchema) {
        itemSchema = item.limit ? itemSchema.max(item.limit, `Слишком большое значение ${item.name}, максимум: ${item.limit}`) : itemSchema
    }
    //Необходимое поле или нет
    itemSchema = item.required ? itemSchema!.required("Необходимо заполнить") : itemSchema;
    
    //Необходимость наличия поля в схеме(всегда обязательно)

    itemSchema = itemSchema.defined("Свойство необходимо определить").nullable().typeError("Заполните поле")
    
    return itemSchema
}
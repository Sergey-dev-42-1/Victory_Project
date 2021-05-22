import {ApplicationField, HTMLInputTypes} from "./Types"
import * as yup from "yup";

import {ObjectShape} from "yup/lib/object";

export const schemaConstructor = (Application: ApplicationField[]) => {


    let FormSchema = yup.object({});

    Application.forEach((item: ApplicationField) => {
        const newSchemaField = schemaDefiner(item)
        let shapeObject: ObjectShape = {};


        shapeObject[item.id] = newSchemaField

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
        case HTMLInputTypes.email: {
            itemSchema = yup.string().email("Введите верный E-mail адрес")
            break;
        }
        case HTMLInputTypes.url: {
            itemSchema = yup.string().url("Введите верный адрес")
            break;
        }
        case HTMLInputTypes.tel: {
            itemSchema = yup.string().matches(RegExp('[+][0-9]{11}$'), "Введите верный номер телефона(с +)")
            break;
        }
    }
    //Устанавливаем лимит на числовых и строковых значениях 
    if (itemSchema instanceof yup.StringSchema) {
        itemSchema = item.constraints.min ? itemSchema
            .min(parseInt(item.constraints.min), `Слишком короткое значение "${item.name}", минимум: ${item.constraints.min}`) : itemSchema

    }
    if (itemSchema instanceof yup.StringSchema) {
        itemSchema = item.constraints.max ? itemSchema
            .max(item.constraints.max, `Слишком длинное значение "${item.name}", максимум: ${item.constraints.max}`) : itemSchema

    }

    //По какой-то неведомой мне тайпскриптной причине, проверка  на instanceof (что-то) подтверждает  что это (что-то), только один раз
    //Проверка на >0 если число
    if (itemSchema instanceof yup.NumberSchema) {
        itemSchema = item.constraints.min ? itemSchema.min(item.constraints.min, `Значение должно быть больше ${item.constraints.min}`): itemSchema

    }
    //Проверка на < максимума если число
    if (itemSchema instanceof yup.NumberSchema) {
        itemSchema = item.constraints.max ? itemSchema.max(item.constraints.max, `Слишком большое значение "${item.name}", максимум: ${item.constraints.max}`) : itemSchema
    }
    //Необходимое поле или нет
    itemSchema = item.required ? itemSchema!.required("Необходимо заполнить") : itemSchema;

    //Необходимость наличия поля в схеме(всегда обязательно)

    itemSchema = itemSchema.defined("Свойство необходимо определить").nullable().typeError("Заполните поле")

    return itemSchema
}
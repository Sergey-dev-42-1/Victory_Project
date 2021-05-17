//Файл для помещения сюда интерфейсов некоторых сущностей

export enum UserRoles {
  organistor = 0,
  participant,
  expert,
}

export interface User {
    username: string;
    email?: string;
    password?: string;
}

export interface Contest {
  id: string;
  name: string;
  notes: string;
  //TODO: Лучше конкретно определить варианты статусов, на сервере
  status: string;
  role: UserRoles;
  //Date плохо совместим с Redux подробнее в store.tsx
  dateBeginning: number;
  dateEnding: number;
  applyDateBeginning: number;
  applyDateEnding: number;
}

export interface ApplicationField{
  name: string,
  type: HTMLInputTypes,
  //Если поле числовое, лимит на верхнее значение, если текстовое, то на длину
  limit?: number,
  required: boolean
}
export interface Application{

  fileUrl: string,
  fields: ApplicationField[]
}
export enum HTMLInputTypes{
    button = "button",
    checkbox = "checkbox",
    color = "color",
    date = "date",
    dateTimeLocal = "datetime-local",
    email = "email",
    file = "file",
    hidden = "hidden",
    image = "image",
    month = "month",
    number = "number",
    password = "password",
    radio = "radio",
    range = "range",
    reset = "reset",
    search = "search",
    submit = "submit",
    tel = "tel",
    text = "text",
    time = "time",
    url = "url",
    week = "week"
}
//Файл для помещения сюда интерфейсов некоторых сущностей

export enum UserRoles {
    organizator = 0,
    expert,
    participant,
}

export interface User {
    username: string;
    email?: string;
    password?: string;
}

export interface Contest {
    Id: string;
    Name: string;
    Comment: string;
    //TODO: Лучше конкретно определить варианты статусов, на сервере
    Status: string;
    UserRoleContest: UserRoles;
    //Date плохо совместим с Redux подробнее в store.tsx
    StartDate: number;
    EndDate: number;
    StartRegistrationDate: number;
    EndRegistrationDate: number;
}

export interface ApplicationField {
    id: number,
    name: string,
    type: HTMLInputTypes,
    required: boolean,
    constraints: any
}

export enum HTMLInputTypes {
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
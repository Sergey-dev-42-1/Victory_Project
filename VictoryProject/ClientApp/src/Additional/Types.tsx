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
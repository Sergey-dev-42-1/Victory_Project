import React from "react";
import {Contest, UserRoles} from "../../../Additional/Types"

export const tempContestData = new Contest(
    "10000000",
    "Название",
    "Заметки о конкурсе",
    "Начат",
    UserRoles.organistor, 
    new Date(Date.now()),
    new Date(Date.now() + 86400 * 1000),
    new Date(Date.now() + 86400 * 1000 * 20),
    new Date(Date.now() + 86400 * 1000 * 31),
);

export const ContestContext = React.createContext({...tempContestData});
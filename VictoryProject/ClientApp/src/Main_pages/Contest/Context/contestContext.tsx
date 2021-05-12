import React from "react";
import {Contest} from "../../../Additional/Types"

export const tempContestData = new Contest(
    "Название",
    "Заметки о конкурсе",
    "Начат",
    new Date(Date.now()),
    new Date(Date.now() + 86400 * 1000),
    new Date(Date.now() + 86400 * 1000 * 20),
    new Date(Date.now() + 86400 * 1000 * 31)
);

export const ContestContext = React.createContext({...tempContestData});
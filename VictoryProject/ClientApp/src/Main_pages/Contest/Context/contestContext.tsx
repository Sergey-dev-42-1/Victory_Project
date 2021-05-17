import React from "react";
import {Contest, UserRoles} from "../../../Additional/Types"

export const tempContestData: Contest = {
    id: "10000000",
    name: "Название",
    notes: "Заметки о конкурсе",
    status: "Начат",
    role: UserRoles.organistor,
    dateBeginning: Date.now(),
    dateEnding: Date.now() + 86400 * 1000,
    applyDateBeginning: Date.now() + 86400 * 1000 * 20,
    applyDateEnding: Date.now() + 86400 * 1000 * 31,
};

export const ContestContext = React.createContext({...tempContestData});
import React from "react";
import {Contest, UserRoles} from "../../../Additional/Types"

export const tempContestData: Contest = {
    Id: "10000000",
    Name: "Умник",
    Comment: "Здесь можно оставить описание конкурса",
    Status: "Начат",
    UserRoleContest: UserRoles.organizator,
    StartDate: Date.now(),
    EndDate: Date.now() + 86400 * 1000,
    StartRegistrationDate: Date.now() + 86400 * 1000 * 20,
    EndRegistrationDate: Date.now() + 86400 * 1000 * 31,
};

export const ContestContext = React.createContext({...tempContestData});
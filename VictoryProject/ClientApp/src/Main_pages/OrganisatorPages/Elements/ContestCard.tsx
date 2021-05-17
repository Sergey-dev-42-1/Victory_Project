import CreateSharpIcon from "@material-ui/icons/Create";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import React from "react";
import {Link, navigate} from "@reach/router";
import {Contest} from "../../../Additional/Types";
import {IconButton, Tooltip} from "@material-ui/core";

interface Props {
    contest: Contest;
    id: string;
}

export const ContestCard = ({contest, id}: Props) => {
    return (
        <div className="contestCardContainer">
            <div className="baseInfo">
                <Link to={`/contest/` + (id || "3")} state={{contest: contest, id: id}}>
                    <label className="contestName">{contest.name}</label>
                </Link>
                <label className="timePeriod">
                    {"Даты проведения:" +
                    new Date(contest.dateBeginning).toLocaleDateString()
                    + "-" +
                    new Date(contest.dateEnding).toLocaleDateString()
                    }
                </label>
            </div>
            <div className="description">
                <span>Примечания</span>
                {contest.notes}
            </div>
            <div className="status">Статус: {contest.status}</div>
            
            <div className="controls">

                <Tooltip title={"Личный кабинет конкурса"}>
                    <IconButton  onClick={()=>{navigate(`contest/${contest.id}`)}}>
                        <CreateSharpIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title={"Перейти на страницу конкурса"}>
                    <IconButton  onClick={()=>{navigate(`/contest/${contest.id}/presentation/news`)}}>
                        <OpenInNewIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

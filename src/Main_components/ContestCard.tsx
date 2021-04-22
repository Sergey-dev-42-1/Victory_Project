import CreateSharpIcon from "@material-ui/icons/Create";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import React from "react";
import { IconWrapper } from "../Additional/IconTooltipWrapper";
import { Link, useLocation } from "@reach/router";
import { Contest } from "../Additional/Types";
import { ContestPage } from "../Contest/ContestPage";

interface Props {
  contest: Contest;
  id: string;
}

export const ContestCard = ({ contest, id }: Props) => {
  return (
    <div className="contestCardContainer">
      <div className="baseInfo">
        <Link to={`/contest/` + (id || "3")} state={{ contest: contest }}>
          <label className="contestName">{contest.name}</label>
        </Link>
        <label className="timePeriod">
          {"Даты проведения:" +
            contest.dateBeginning.toLocaleDateString() +
            "-" +
            contest.dateEnding.toLocaleDateString()}
        </label>
      </div>
      <div className="description">
        <span>Примечания</span>
        {contest.notes}
      </div>
      <div className="status">Статус: {contest.status}</div>
      <div className="controls">
        <IconWrapper
          tooltipText="Изменить"
          icon={
            <CreateSharpIcon
              style={{ fontSize: "1.5em", pointerEvents: "none" }}
            ></CreateSharpIcon>
          }
        ></IconWrapper>
        <IconWrapper
          tooltipText="Просмотр"
          icon={
            <OpenInNewIcon
              style={{ fontSize: "1.5em", pointerEvents: "none" }}
            ></OpenInNewIcon>
          }
        ></IconWrapper>
      </div>
    </div>
  );
};

import CreateSharpIcon from "@material-ui/icons/Create";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import React from "react";
import { IconWrapper } from "../Additional/IconTooltipWrapper";
import { Link } from "react-router-dom";
import { Contest } from "../Additional/Types";

export const ContestCard = ({
  name,
  notes,
  status,
  dateBeginning,
  dateEnding,
}: Contest) => {
  return (
    <div className="contestCardContainer">
      <div className="baseInfo">
        <Link to={"/contest/" + "1"}>
          <label className="contestName">{name}</label>
        </Link>
        <label className="timePeriod">
          {"Даты проведения:" +
            dateBeginning.toLocaleDateString() +
            "-" +
            dateEnding.toLocaleDateString()}
        </label>
      </div>
      <div className="description">
        <span>Примечания</span>
        {notes}
      </div>
      <div className="status">Статус: {status}</div>
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

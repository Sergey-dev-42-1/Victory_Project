import CreateSharpIcon from "@material-ui/icons/Create";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import React from "react";
import { IconWrapper } from "../Additional/IconTooltipWrapper";
import { Link } from "react-router-dom";
//TODO: Переместить в отдельный файл с типами?
export class Contest {
  name: string;
  notes: string;
  //TODO: Лучше конкретно определить варианты статусов, на сервере
  status: string;
  dateBeginning: string;
  applyDateBeginning: string;
  applyDateEnding: string;
  dateEnding: string;
  constructor(
    name: string,
    notes: string,
    status: string,
    dateBegining: Date,
    dateEnding: Date,
    applyDateBeginning: Date,
    applyDateEnding: Date
  ) {
    this.name = name;
    this.notes = notes;
    this.status = status;
    this.dateBeginning = dateBegining.toLocaleDateString();
    this.dateEnding = dateEnding.toLocaleDateString();
    this.applyDateBeginning = applyDateBeginning.toLocaleDateString();
    this.applyDateEnding = applyDateEnding.toLocaleDateString();
  }
}

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
          {"Даты проведения:" + dateBeginning + "-" + dateEnding}
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

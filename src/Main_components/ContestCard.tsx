import CreateSharpIcon from "@material-ui/icons/Create";
import React from "react";
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
  const messageMouseOverIcon = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    text: string
  ) => {
    const icon_container = event.target as Element;

    const iconDescription = document.createElement("div");
    iconDescription.setAttribute("class", "iconDescription");

    iconDescription.innerText = text;
    icon_container.before(iconDescription);
  };

  const messageLeaveIcon = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    var targeted = event.target as Element;
    var iconDescription = targeted.parentElement!.getElementsByClassName(
      "iconDescription"
    );

    if (iconDescription) {
      targeted.parentElement!.removeChild(iconDescription[0] as Element);
    }
  };

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
        <div
          onMouseOver={(event) => messageMouseOverIcon(event, "Изменить")}
          onMouseOut={(event) => messageLeaveIcon(event)}
          className="controlButton"
        >
          <CreateSharpIcon
            style={{ fontSize: "2vw", pointerEvents: "none" }}
          ></CreateSharpIcon>
        </div>
      </div>
    </div>
  );
};

import CreateSharpIcon from "@material-ui/icons/Create";

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
        <label className="contestName">{name}</label>
        <label className="timePeriod">{dateBeginning + "-" + dateEnding}</label>
      </div>
      <div className="description">{notes}</div>
      <div className="controls">
        <span className="status">{status}</span>
        <CreateSharpIcon style={{ fontSize: "1vw" }}></CreateSharpIcon>
      </div>
    </div>
  );
};

//Файл для помещения сюда интерфейсов некоторых сущностей
export class Contest {
  name: string;
  notes: string;
  //TODO: Лучше конкретно определить варианты статусов, на сервере
  status: string;
  dateBeginning: Date;
  dateEnding: Date;
  applyDateBeginning: Date;
  applyDateEnding: Date;
  constructor(
    name: string,
    notes: string,
    status: string,
    dateBeginning: Date,
    dateEnding: Date,
    applyDateBeginning: Date,
    applyDateEnding: Date
  ) {
    this.name = name;
    this.notes = notes;
    this.status = status;
    this.dateBeginning = dateBeginning;
    this.dateEnding = dateEnding;
    this.applyDateBeginning = applyDateBeginning;
    this.applyDateEnding = applyDateEnding;
  }
}

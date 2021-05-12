//Файл для помещения сюда интерфейсов некоторых сущностей
export enum UserRoles {
  organistor = "organisator",
  participant = "participant",
  expert = "expert",
}

export class User {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
export class Contest {
  id?: string;
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

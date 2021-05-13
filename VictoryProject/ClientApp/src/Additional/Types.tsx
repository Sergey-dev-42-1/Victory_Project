//Файл для помещения сюда интерфейсов некоторых сущностей
export enum UserRoles {
  organistor = 0,
  participant,
  expert,
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
  id: string;
  name: string;
  notes: string;
  //TODO: Лучше конкретно определить варианты статусов, на сервере
  status: string;
  role: UserRoles;
  dateBeginning: Date;
  dateEnding: Date;
  applyDateBeginning: Date;
  applyDateEnding: Date;
  constructor(
      id: string,
    name: string,
    notes: string,
    status: string,
    role: UserRoles,
    dateBeginning: Date,
    dateEnding: Date,
    applyDateBeginning: Date,
    applyDateEnding: Date
  ) {
    this.id = id
    this.name = name;
    this.role = role;
    this.notes = notes;
    this.status = status;
    this.dateBeginning = dateBeginning;
    this.dateEnding = dateEnding;
    this.applyDateBeginning = applyDateBeginning;
    this.applyDateEnding = applyDateEnding;
  }
}

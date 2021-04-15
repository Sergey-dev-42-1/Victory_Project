import React from "react";
import { useNavigate } from "react-router-dom";

export class SidebarButton {
  readonly text: string;
  readonly classes: string;
  to: string;
  constructor(text: string, classes: Array<string>, to: string = "./") {
    this.text = text;
    this.classes = this.cssReduce(classes);
    this.to = to;
  }

  private cssReduce(classes: Array<string>): string {
    return classes.reduce(
      (acc: string, value: string) => acc + (acc === "" ? value : " " + value)
    );
  }
}

//Для организатора
export const Orgbuttons = [
  new SidebarButton("Главная", ["primaryButton"]),
  new SidebarButton("Конкурсы", ["primaryButton"]),
];
interface Props {
  buttons: Array<SidebarButton>;
}
//Кнопки настроены лишь выполнять навигацию по ссылке, кнопки с другой логикой нужно писать в самом компоненте
export const OrgComposition = ({ buttons }: Props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {buttons.map((button: SidebarButton) => {
        return (
          <button
            key={button.text}
            onClick={() => navigate(button.to)}
            className={button.classes}
          >
            {button.text}
          </button>
        );
      })}
      <span className="spacer"></span>
      <button
        //TODO: Обрвботчик выхода из учетной записи
        onClick={() => navigate("/")}
        className="primaryButton"
      >
        Выйти
      </button>
    </React.Fragment>
  );
};

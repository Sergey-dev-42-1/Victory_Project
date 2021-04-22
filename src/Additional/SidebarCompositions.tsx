import { ExitToApp } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../state/sidebarSlice";
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
  new SidebarButton("Конкурсы", ["primaryButton"], "/main"),
  new SidebarButton("Эксперты", ["primaryButton"]),
  new SidebarButton("Организаторы", ["primaryButton"]),
];
interface Props {
  buttons: Array<SidebarButton>;
}
//Кнопки настроены лишь выполнять навигацию по ссылке, кнопки с другой логикой нужно писать в самом компоненте
export const OrgComposition = ({ buttons }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      {buttons.map((button: SidebarButton) => {
        return (
          <button
            key={button.text}
            onClick={() => {
              dispatch(toggle());
              navigate(button.to);
            }}
            className={button.classes}
          >
            {button.text}
          </button>
        );
      })}
      <span className="spacer"></span>
      <button
        //TODO: Обработчик выхода из учетной записи
        onClick={() => navigate("/")}
        className="primaryButton"
      >
        Выйти <ExitToApp style={{ fontSize: "3vh" }}></ExitToApp>{" "}
      </button>
    </React.Fragment>
  );
};

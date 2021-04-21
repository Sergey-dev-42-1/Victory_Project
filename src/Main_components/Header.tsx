import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle, selectSidebarOpen } from "../state/sidebarSlice";
import { CSSTransition } from "react-transition-group";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import { LogInForm } from "../Forms/LogInForm";
//TODO: Опираться на то, авторизован пользователь или нет при показе полей
export const Header = () => {
  const dispatch = useDispatch();
  const opened = useSelector(selectSidebarOpen);
  const [logIn, setLogIn] = useState(false);

  return (
    <React.Fragment>
      {logIn && (
        <React.Fragment>
          <div
            onClick={() => {
              setLogIn(false);
            }}
            //Модалка закрывающая другие элементы от взаимодействия, поверх
            //которой можно устанавливать разные формы
            //требующие внимания пользователя, ShowControls - оставить видимыми сайдбар и хедер
            className="modalHideControls"
          ></div>
        </React.Fragment>
      )}
      <CSSTransition
        unmountOnExit={true}
        in={logIn}
        timeout={500}
        classNames="fadeIn"
      >
        <LogInForm />
      </CSSTransition>
      <header className="Header">
        {!localStorage.getItem("userData") && (
          <div
            className="showSidebarContainer"
            onClick={() => {
              dispatch(toggle());
            }}
          >
            {opened ? (
              <CloseIcon style={{ fontSize: "3vw" }} htmlColor={"#f06f19"} />
            ) : (
              <MenuIcon style={{ fontSize: "3vw" }} htmlColor={"#f06f19"} />
            )}
          </div>
        )}

        <Link to="./main">
          <p className="title">Victory</p>
        </Link>
        <span className="spacer"></span>
        {!localStorage.getItem("userData") ? (
          <React.Fragment>
            <button
              onClick={() => {
                setLogIn(true);
              }}
              className="link"
            >
              <div className="linkContainer">
                <span>Войти</span>
              </div>
            </button>
            <Link to="./signup" className="link">
              <div className="linkContainer">
                <span>Зарегестрироваться</span>
              </div>
            </Link>
          </React.Fragment>
        ) : (
          <Link to="./" className="link">
            <div className="linkContainer">
              <span>Имя пользователя</span>
            </div>
          </Link>
        )}
      </header>
    </React.Fragment>
  );
};

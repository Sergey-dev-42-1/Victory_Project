import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle, selectSidebarOpen } from "../state/sidebarSlice";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
//TODO: Опираться на то, авторизован пользователь или нет
export const Header = () => {
  const dispatch = useDispatch();
  const opened = useSelector(selectSidebarOpen);
  return (
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
      <p className="title">Victory</p>
      <span className="spacer"></span>
      {!localStorage.getItem("userData") ? (
        <React.Fragment>
          <Link to="./signin" className="link">
            <div className="linkContainer">
              <span>Войти</span>
            </div>
          </Link>
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
  );
};

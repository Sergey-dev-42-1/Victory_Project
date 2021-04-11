import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  return (
    <div className="Header">
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
    </div>
  );
};

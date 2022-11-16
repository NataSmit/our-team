import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ handleLogin, serverError }) {
  const [newType, setNewType] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const mailFormatErr = !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(mail);
  const disabledBtn = !mailFormatErr && password.length >= 3;

  function handleToggleViewBtn() {
    setNewType(!newType);
  }

  function handleMailChange(e) {
    setMail(e.target.value);
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    handleLogin(mail, password);
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      default:
        setEmailDirty(false);
        setPasswordDirty(false);
    }
  }

  return (
    <div className="registration">
      <div className="registration__container">
        <h1 className="registration__title">Вход</h1>
        <form className="registration__form" onSubmit={handleFormSubmit}>
          <label className="registration__lable" htmlFor="mail">
            Электронная почта
          </label>
          <input
            value={mail}
            onChange={handleMailChange}
            className="registration__input"
            id="mail"
            placeholder="example@mail.ru"
            type="email"
            onBlur={blurHandler}
            name="email"
          />
          <span className="registration__error">
            {emailDirty && mailFormatErr && "Почта не валидна"}
          </span>
          <label className="registration__lable">
            Пароль
            <input
              className="registration__input registration__input_type_pw"
              id="password"
              type={`${newType ? "text" : "password"}`}
              value={password}
              onChange={handlePwChange}
              onBlur={blurHandler}
              name="password"
            />
            <button
              className={`registration__view-toggle ${
                newType ? "registration__view-toggle_type_visible" : ""
              }`}
              type="button"
              onClick={handleToggleViewBtn}
            ></button>
          </label>
          <span className="registration__error">
            {passwordDirty &&
              password.length < 3 &&
              "Минимальная длина пароля 3 символа"}
          </span>
          <span className="registration__error">
            {" "}
            {serverError.slice(10, -2)}{" "}
          </span>
          <button
            className="registration__button registration__button_type_login"
            disabled={!disabledBtn}
          >
            Войти
          </button>

          <Link to="/registration" className="registration__redirect">
            Нет аккаунта?{" "}
            <span className="registration__redirect registration__redirect_type_span">
              Регистрация
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}

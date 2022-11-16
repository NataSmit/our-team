/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Registration({ handleRegistration, serverError }) {
  const [newType, setNewType] = useState(false);
  const [newTypeRepeate, setNewTypeRepeate] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false);
  const isSamePw = password === passwordRepeat;
  const mailFormatErr = !/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(mail);
  const disabledBtn = !mailFormatErr && password.length >= 3 && isSamePw;

  function handleMailChange(e) {
    setMail(e.target.value);
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
  }

  function handlePwChangeRepeat(e) {
    setPasswordRepeat(e.target.value);
  }

  function handleToggleViewBtn() {
    setNewType(!newType);
  }

  function handleToggleViewBtnRepeat() {
    setNewTypeRepeate(!newTypeRepeate);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRegistration(mail, password);
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "passwordRepeat":
        setPasswordRepeatDirty(true);
        break;
      default:
        setEmailDirty(false);
        setPasswordDirty(false);
        setPasswordRepeatDirty(false);
    }
  }

  return (
    <div className="registration">
      <div className="registration__container">
        <h1 className="registration__title">Регистрация</h1>
        <form className="registration__form" onSubmit={handleFormSubmit}>
          <label className="registration__lable" htmlFor="name">
            Имя
          </label>
          <input
            className="registration__input"
            id="name"
            placeholder="Артур"
          />
          <span className="registration__error">
            {" "}
            {serverError.slice(10, -2)}{" "}
          </span>
          <label className="registration__lable" htmlFor="mail">
            Электронная почта
          </label>
          <input
            value={mail}
            onChange={handleMailChange}
            className={`registration__input ${
              mailFormatErr && emailDirty
                ? "registration__input_type_error"
                : ""
            }`}
            id="mail"
            placeholder="example@mail.ru"
            type="email"
            name="email"
            onBlur={blurHandler}
          />
          <span className="registration__error">
            {emailDirty && mailFormatErr && "Неверный формат"}
          </span>
          <label className="registration__lable">
            Пароль
            <input
              value={password}
              onChange={handlePwChange}
              className={`registration__input registration__input_type_pw ${
                passwordDirty && !isSamePw
                  ? "registration__input_type_error"
                  : ""
              }`}
              id="password"
              type={`${newType ? "text" : "password"}`}
              maxLength="30"
              minLength="3"
              name="password"
              onBlur={blurHandler}
            />
            <button
              className={`registration__view-toggle ${
                newType ? "registration__view-toggle_type_visible" : ""
              }`}
              type="button"
              onClick={handleToggleViewBtn}
            ></button>
          </label>
          <label className="registration__lable">
            Подтвердите пароль
            <input
              className={`registration__input registration__input_type_pw ${
                passwordRepeatDirty && !isSamePw
                  ? "registration__input_type_error"
                  : ""
              }`}
              id="repeatPW"
              type={`${newTypeRepeate ? "text" : "password"}`}
              maxLength="30"
              value={passwordRepeat}
              onChange={handlePwChangeRepeat}
              name="passwordRepeat"
              onBlur={setPasswordRepeatDirty}
            />
            <button
              className={`registration__view-toggle ${
                newTypeRepeate ? "registration__view-toggle_type_visible" : ""
              }`}
              type="button"
              onClick={handleToggleViewBtnRepeat}
            ></button>
          </label>
          <span className="registration__error">
            {passwordRepeatDirty && !isSamePw && "Пароли не совпадают"}
          </span>
          <span className="registration__error">
            {" "}
            {serverError.slice(10, -2)}{" "}
          </span>
          <button disabled={!disabledBtn} className="registration__button">
            Зарегистрироваться
          </button>
          <Link to="/login" className="registration__redirect">
            Уже есть аккаунт?{" "}
            <span className="registration__redirect registration__redirect_type_span">
              Войти
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}

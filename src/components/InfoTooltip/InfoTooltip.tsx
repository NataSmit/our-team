import React from "react";
import closeIcon from "../../images/Close-Icon.svg";

interface InfoTooltipProps {
  isOpen: boolean,
  onClose: () => void,
  message: string,
  successful: boolean | undefined
}

export default function InfoTooltip(props: InfoTooltipProps) {
  return (
    <div className={`popup  ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_tooltip">
        <div
          className={`${
            props.successful
              ? "popup__tooltip-img"
              : "popup__tooltip-img_type_error"
          }`}
        ></div>
        <p className="popup__tooltip-message">{props.message}</p>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
        >
          <img className="popup__close-icon" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
}

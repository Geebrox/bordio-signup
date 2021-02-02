import React from "react";

import { mergeClasses } from "../../utils";

import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/error.svg";
import closeIcon from "../../assets/icons/close.svg";

const CLASS_NOTIFICATION_BASE: string =
  "bg-white p-4 shadow-lg border border-gray-300 rounded-lg width-full max-w-400 flex items-start space-x-4";

const Notification: React.FC<iNotificationProps & React.HTMLAttributes<{}>> = ({
  className = "",
  type,
  title,
  message = "",
  closeable = false,
  onClose,
}) => {
  return (
    <div className={mergeClasses(CLASS_NOTIFICATION_BASE, className)}>
      <img
        className="w-6 h-6"
        src={type === "success" ? successIcon : errorIcon}
        alt="notification"
      />
      <div className="h-full flex-auto font-roboto text-gray-300 flex flex-col">
        <h1 className="text-base font-bold">{title}</h1>
        {message.length > 0 ? (
          <p className="text-sm text-gray-200">{message}</p>
        ) : null}
      </div>
      {closeable === true ? (
        <img
          className="w-6 h-6 cursor-pointer hover:opacity-70"
          src={closeIcon}
          alt="close"
          onClick={() => onClose && onClose()}
        />
      ) : null}
    </div>
  );
};

export default Notification;

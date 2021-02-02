import React from "react";
import { mergeClasses } from "../../utils";

const CLASS_TEXT_FIELD_CONTAINER: string =
  "w-full flex items-center space-x-4 rounded-lg px-4 bg-gray-100 relative";

const CLASS_TEXT_FIELD_BASE: string =
  "w-full h-full my-2 py-2 bg-gray-100 text-gray-300 text-sm font-roboto placeholder-gray-200 focus:outline-none";

const TextField: React.FC<iTextFieldProps & React.InputHTMLAttributes<{}>> = ({
  containerClass = "",
  className = "",
  icon = "",
  error = "",
  onBlur,
  ...restProps
}) => {
  return (
    <div className={mergeClasses(CLASS_TEXT_FIELD_CONTAINER, containerClass)}>
      {icon.length > 0 ? (
        <img src={icon} className="w-4 h-4" alt="icon" />
      ) : null}
      <input
        className={mergeClasses(CLASS_TEXT_FIELD_BASE, className)}
        {...restProps}
        onBlur={(): void | boolean => {
          onBlur && onBlur();
        }}
      />
      {error.length > 0 ? (
        <span className="absolute mt-0.5 top-full left-0 font-roboto text-red text-10">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default TextField;

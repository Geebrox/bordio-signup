import React from "react";
import { mergeClasses } from "../../utils";

const CLASS_CHECKBOX_CONTAINER: string =
  "w-full flex items-center font-roboto text-sm relative";

const CLASS_CHECKBOX_BASE: string =
  "w-3.5 h-3.5 rounded border-blue-200 border flex justify-center items-center cursor-pointer";

const CLASS_CHECKBOX_LABEL: string = "select-none ml-2";

const Checkbox: React.FC<iCheckboxProps & React.HTMLAttributes<{}>> = ({
  containerClass = "",
  checkboxClass = "",
  className = "",
  checked = false,
  onCheckStateChange,
  children,
  error = "",
  ...restProps
}) => {
  return (
    <div
      className={mergeClasses(CLASS_CHECKBOX_CONTAINER, containerClass)}
      {...restProps}
    >
      <div
        className={mergeClasses(CLASS_CHECKBOX_BASE, checkboxClass)}
        onClick={(): void => {
          onCheckStateChange && onCheckStateChange(!checked);
        }}
      >
        {checked ? (
          <span className="h-3/4 w-5/12 mr-px border-r border-b border-blue-200 transform rotate-45 origin-right" />
        ) : null}
      </div>

      <span className={mergeClasses(CLASS_CHECKBOX_LABEL, className)}>
        {children}
      </span>

      {error.length > 0 ? (
        <span className="absolute top-full left-4 font-roboto text-red text-10">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default Checkbox;

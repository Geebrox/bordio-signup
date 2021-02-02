import React from "react";
import { mergeClasses } from "../../utils";
import Button from "./Button";

const CLASS_FORM_CONTAINER: string =
  "bg-white h-screen max-w-full rounded-none w-full py-8 pb-12 px-7 sm:rounded-lg sm:h-auto sm:max-w-400 flex flex-col justify-center sm:justify-start";

const Form: React.FC<iFormProps & React.HTMLAttributes<{}>> = ({
  className = "",
  buttonClass = "",
  title = "",
  actionTitle = "",
  onAction,
  isValid = false,
  loading = false,
  children,
  ...restProps
}) => {
  return (
    <div
      className={mergeClasses(CLASS_FORM_CONTAINER, className)}
      {...restProps}
    >
      {title.length > 0 ? (
        <h1 className="font-roboto font-bold text-24 text-gray-300 text-center">
          {title}
        </h1>
      ) : null}
      <div className="w-full py-9 space-y-5">{children}</div>
      {actionTitle.length > 0 ? (
        <Button
          className={buttonClass}
          onClick={onAction}
          disabled={!isValid}
          loading={loading}
          data-testid="formActionButton"
        >
          {actionTitle}
        </Button>
      ) : null}
    </div>
  );
};

export default Form;

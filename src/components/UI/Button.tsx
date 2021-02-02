import React from "react";
import { mergeClasses } from "../../utils";

const CLASS_BUTTON_BASE: string =
  "w-full text-center font-roboto text-lg text-white p-5 rounded-4xl focus:outline-none transition-all ease-out duration-300 flex flex-row justify-center";

const Button: React.FC<iButtonProps & React.ButtonHTMLAttributes<{}>> = ({
  className = "",
  disabled = false,
  children,
  loading = false,
  ...restProps
}) => {
  return (
    <button
      className={mergeClasses(
        `${CLASS_BUTTON_BASE} ${
          disabled
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-200 hover:opacity-90 cursor-pointer"
        }`,
        className
      )}
      disabled={disabled}
      {...restProps}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;

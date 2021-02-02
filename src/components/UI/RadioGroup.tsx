import React from "react";
import { mergeClasses } from "../../utils";

const CLASS_RADIO_GROUP_CONTAINER: string = "w-full flex space-x-6 relative";

const CLASS_RADIO_ITEM_BASE: string =
  "space-x-2 flex items-center cursor-pointer select-nonefont-roboto text-gray-300 text-sm";

const RadioGroup: React.FC<iRadioGroupProps & React.HTMLAttributes<{}>> = ({
  className = "",
  containerClass = "",
  items,
  checked,
  onItemSelect,
  error = "",
  ...restProps
}) => {
  return items ? (
    <div className={mergeClasses(CLASS_RADIO_GROUP_CONTAINER, containerClass)}>
      {items.map((item: iRadioItem, idx: number) => (
        <div
          key={idx}
          className={mergeClasses(CLASS_RADIO_ITEM_BASE, className)}
          onClick={(): void | boolean => {
            onItemSelect && item.value !== checked && onItemSelect(item.value);
          }}
          {...restProps}
        >
          <span
            className={`w-3.5 h-3.5 inline-block rounded-full border border-blue-200 shadow-radio${
              item.value === checked ? " bg-blue-200" : ""
            }`}
          />
          <span>{item.label}</span>
        </div>
      ))}
      {error.length > 0 ? (
        <span className="absolute top-full -left-2 font-roboto text-red text-10">
          {error}
        </span>
      ) : null}
    </div>
  ) : null;
};

export default RadioGroup;

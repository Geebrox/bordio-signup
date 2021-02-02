import React, { useState, useCallback } from "react";
import { mergeClasses } from "../../utils";
import carretIcon from "../../assets/icons/carret.svg";

const CLASS_SELECT_CONTAINER: string = "w-full relative";

const CLASS_SELECT_BASE: string =
  "w-full flex rounded-lg p-4 bg-gray-100 cursor-pointer items-center";

const CLASS_SELECT_ITEMS_CONTAINER: string =
  "absolute z-10 top-full left-0 rounded-lg w-full bg-white shadow-select transition-all duration-300 in-expo overflow-y-auto no-scrollbar";

const CLASS_SELECT_ITEM: string =
  "py-2 px-5 font-roboto text-gray-300 hover:bg-gray-100 cursor-pointer select-none";

const Select: React.FC<iSelectProps & React.HTMLAttributes<{}>> = ({
  containerClass = "",
  className = "",
  itemsContainerClass = "",
  itemClass = "",
  placeholder = "",
  selected = "",
  items,
  onItemSelect,
  error = "",
  ...restProps
}) => {
  const [isOpen, setOpen] = useState<Boolean>(false);

  const toggleSelect = useCallback((): void => {
    setOpen(!isOpen);
  }, [isOpen]);

  const getItemLabelByValue = useCallback(
    (searchValue: string): string => {
      const foundItem: iSelectItem | undefined = items.find(
        (item: iSelectItem) => item.value === searchValue
      );
      return foundItem !== undefined ? foundItem.label : "";
    },
    [items]
  );

  const isActiveItem = useCallback(
    (item: iSelectItem, selected: string): boolean => {
      return item.value === selected;
    },
    []
  );

  return items ? (
    <div className={mergeClasses(CLASS_SELECT_CONTAINER, containerClass)}>
      <div
        className={`${CLASS_SELECT_BASE} ${className}`}
        onClick={toggleSelect}
        {...restProps}
      >
        <span
          className={`h-full flex-auto text-sm font-roboto ${
            selected.length > 0 ? "text-gray-300" : "text-gray-200"
          }`}
        >
          {selected.length > 0 ? getItemLabelByValue(selected) : placeholder}
        </span>

        <img
          className={`h-full w-auto transform${!isOpen ? " rotate-180" : ""}`}
          src={carretIcon}
          alt="open/close"
        />
      </div>

      {error.length > 0 ? (
        <span className="absolute mt-0.5 top-full left-4 font-roboto text-red text-10">
          {error}
        </span>
      ) : null}

      {isOpen && (
        <div
          className="w-screen h-screen fixed top-0 left-0 pointer-events-auto"
          onClick={toggleSelect}
        />
      )}

      <ul
        className={mergeClasses(
          `${CLASS_SELECT_ITEMS_CONTAINER} ${
            isOpen ? "max-h-80 py-2 mt-2" : "max-h-0"
          }`,
          itemsContainerClass
        )}
      >
        {items.map((item: iSelectItem, idx: number) => (
          <li
            key={idx}
            className={mergeClasses(
              `${CLASS_SELECT_ITEM}${
                isActiveItem(item, selected) ? " bg-gray-100" : ""
              }`,
              itemClass
            )}
            onClick={(): void => {
              toggleSelect();
              onItemSelect &&
                !isActiveItem(item, selected) &&
                onItemSelect(item.value);
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default Select;

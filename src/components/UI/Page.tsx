import React from "react";
import { mergeClasses } from "../../utils";

const CLASS_PAGE_BASE =
  "bg-blue-100 w-full h-screen flex justify-center items-center flex-col";

const Page: React.FC<iPageProps & React.HTMLAttributes<{}>> = ({
  className = "",
  children,
  ...restProps
}) => {
  return (
    <div className={mergeClasses(CLASS_PAGE_BASE, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Page;

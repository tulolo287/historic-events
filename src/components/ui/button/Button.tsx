import React from "react";
import "./styles.scss";

export const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
  children,
  className = "button",
  ...props
}: any) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

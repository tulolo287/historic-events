import React, { useMemo } from "react";
import "./styles.scss";

export const Button: React.FC<
  React.ComponentPropsWithoutRef<"button"> & {
    right?: boolean;
    timeLine?: number;
    timeLineLength?: number;
  }
> = ({
  children,
  className,
  right = false,
  timeLine = 0,
  timeLineLength = 2,
  ...props
}) => {
  let disabled = false;
  const totalClass = useMemo(() => {
    let totalClass = "button ";
    if (timeLine < 1 && !right) {
      totalClass += `${className} disabled`;
      disabled = true;
      return totalClass;
    }
    if (timeLine > timeLineLength - 2 && right) {
      totalClass += `${className}${right ? " right disabled" : ""}`;
      disabled = true;
      return totalClass;
    }
    totalClass += `${className}${right ? " right" : ""}`;
    return totalClass;
  }, [timeLine, timeLineLength]);

  return (
    <button disabled={disabled} {...props} className={totalClass}>
      <svg
        width="10"
        height="14"
        viewBox="0 0 10 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
          stroke="#42567A"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
};

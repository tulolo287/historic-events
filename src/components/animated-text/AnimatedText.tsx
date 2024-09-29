import React, { useMemo } from "react";
import "./styles.scss";

export const AnimatedText = ({
  startYear,
  endYear,
}: {
  startYear: number | string;
  endYear: number | string;
}) => {
  const firstYears = useMemo(() => {
    const yearStr = startYear.toString();
    return {
      startNumbers: yearStr.substring(-5, 2),
      lastNumbers: [...yearStr.substring(2)],
    };
  }, [startYear]);

  const lastYears = useMemo(() => {
    const yearStr = endYear.toString();
    return {
      startNumbers: yearStr.substring(-5, 2),
      lastNumbers: [...yearStr.substring(2)],
    };
  }, [endYear]);

  return (
    <div key={startYear} className="circleBlock__years">
      <div className="years-wrapper">
        <div>
          <span className="font-year__big blue">{firstYears.startNumbers}</span>
        </div>
        <div className="bounce mr80">
          {firstYears.lastNumbers.map((item, idx) => (
            <span key={idx} className="font-year__big blue">
              {item}
            </span>
          ))}
        </div>
        <div className="relative">
          <div className="lineRight" />
          <span className="font-year__big pink">{lastYears.startNumbers}</span>
        </div>
        <div className="bounce">
          {lastYears.lastNumbers.map((item, idx) => (
            <span key={idx} className="font-year__big pink">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

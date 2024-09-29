import React from "react";
import { Button } from "../ui/button/Button";
import './styles.scss'

type TimeLineNavigationProps = {
  currentTimeLine: number;
  lastTimeLine: number;
  handleChangeTimeLine: (isNext?: boolean) => void;
};

export const TimeLineNavigation = ({
  currentTimeLine,
  lastTimeLine,
  handleChangeTimeLine,
}: TimeLineNavigationProps) => {
  return (
    <div className="timeLine">
      <span className="timeLine__title">
        0{currentTimeLine + 1}/0{lastTimeLine}
      </span>
      <div className="timeLine__btnWrapper">
        <Button
          timeLineLength={lastTimeLine}
          timeLine={currentTimeLine}
          onClick={() => handleChangeTimeLine(false)}
        />
        <Button
          timeLineLength={lastTimeLine}
          timeLine={currentTimeLine}
          right={true}
          onClick={() => handleChangeTimeLine()}
        />
      </div>
    </div>
  );
};

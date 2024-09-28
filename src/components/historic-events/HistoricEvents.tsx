import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import React, { useMemo, useState } from "react";
import headerLine from "../../assets/headerLine.svg";
import line from "../../assets/line.svg";
import data from "../../data";
import { EventsSwiper } from "../events-swiper/EventsSwiper";
import { TimeLineCircle } from "../time-line-circle/TimeLineCircle";
import { Button } from "../ui/button/Button";
import "./styles.scss";

gsap.registerPlugin(MotionPathPlugin);

export const HistoricEvents = () => {
  const [currentTimeLine, setCurrentTimeLine] = useState(0);

  const events = useMemo(() => {
    return data[currentTimeLine].events;
  }, [data, currentTimeLine]);

  function handleChangeTimeLine(isNext: boolean) {
    if (isNext && currentTimeLine < data.length - 1) {
      setCurrentTimeLine(currentTimeLine + 1);
    } else if (isNext) {
      setCurrentTimeLine(0);
    }
    if (!isNext && currentTimeLine > 0) {
      setCurrentTimeLine(currentTimeLine - 1);
    } else if (!isNext) {
      setCurrentTimeLine(data.length - 1);
    }
  }
  return (
    <article className="wrapper">
      <div className="svgLineLeft">
        <img src={line} />
        <img src={headerLine} />
      </div>
      <div className="circleBlock__container ml80">
        <div className="circleBlock__header">
          <h1 className="heading">
            Исторические
            <br />
            даты
          </h1>
        </div>
        <TimeLineCircle
          setCurrentTimeLine={setCurrentTimeLine}
          data={data}
          timeLine={currentTimeLine}
        />
        <div className="timeLine mb80">
          <span className="timeLine__title">
            0{currentTimeLine + 1}/0{data.length}
          </span>
          <div className="timeLine__btnWrapper">
            <Button
              timeLineLength={data.length}
              timeLine={currentTimeLine}
              onClick={() => handleChangeTimeLine(false)}
            />
            <Button
              timeLineLength={data.length}
              timeLine={currentTimeLine}
              right={true}
              onClick={() => handleChangeTimeLine(true)}
            />
          </div>
        </div>
        <EventsSwiper events={events} isNavigation={true} />
      </div>
    </article>
  );
};

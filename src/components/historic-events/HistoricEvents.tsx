import React, { useMemo, useState } from "react";
import headerLine from "../../assets/headerLine.svg";
import data from "../../data";
import { EventsSwiper } from "../events-swiper/EventsSwiper";
import { TimeLineCircle } from "../time-line-circle/TimeLineCircle";
import { TimeLineNavigation } from "../time-line-navigation/TimeLineNavigation";
import "./styles.scss";

export const HistoricEvents = () => {
  const [currentTimeLine, setCurrentTimeLine] = useState(0);
  const lastIimeLine = data.length;

  const events = useMemo(() => {
    return data[currentTimeLine];
  }, [data, currentTimeLine]);

  function handleChangeTimeLine(isNext: boolean = true) {
    if (isNext && currentTimeLine < lastIimeLine - 1) {
      setCurrentTimeLine(currentTimeLine + 1);
    }
    if (!isNext && currentTimeLine > 0) {
      setCurrentTimeLine(currentTimeLine - 1);
    }
  }
  return (
    <article className="wrapper">
      <div className="svgLineLeft">
        <div className="lineLeft" />
        <img className="headerLine" src={headerLine} />
      </div>
      <div className="circleBlock__container">
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
          currentTimeLine={currentTimeLine}
        />
        <TimeLineNavigation
          currentTimeLine={currentTimeLine}
          lastTimeLine={lastIimeLine}
          handleChangeTimeLine={handleChangeTimeLine}
        />
        <EventsSwiper events={events.events} isNavigation={true} />
      </div>
    </article>
  );
};

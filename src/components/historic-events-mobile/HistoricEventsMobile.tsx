import React, { useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import data from "../../data";
import { EventsSwiper } from "../events-swiper/EventsSwiper";
import { TimeLineNavigation } from "../time-line-navigation/TimeLineNavigation";
import "./styles.scss";

export const HistoricEventsMobile = () => {
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
    <article className="container-mobile">
      <h1 className="mobile-title">
        Исторические
        <br />
        даты
      </h1>
      <div className="years-mobile">
        <span className="heading pink mr20">{events.events[0].year}</span>
        <span className="heading blue">
          {events.events[events.events.length - 1].year}
        </span>
      </div>
      <div className="theme-mobile">
        <h3 className="theme-mobile__title">{events.title}</h3>
        <hr className="theme-mobile__line" />
      </div>

      <EventsSwiper events={events.events} isNavigation={false} sliders={2} />
      <div className="timeLine-mobile">
        <TimeLineNavigation
          currentTimeLine={currentTimeLine}
          lastTimeLine={lastIimeLine}
          handleChangeTimeLine={handleChangeTimeLine}
        />
        <div className="timeLine__controller">
          {data.map((item, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentTimeLine(idx)}
              className={`timeLine__controller-point${
                currentTimeLine === idx ? " active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

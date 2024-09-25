import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import React, { useEffect, useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import data from "../../data";
import { EventsSwiper } from "../EventsSwiper";
import "./styles.scss";

gsap.registerPlugin(MotionPathPlugin);

export const HistoricEventsMobile = () => {
  const [currentTimeLine, setCurrentTimeLine] = useState(0);

  const events = useMemo(() => {
    return data[currentTimeLine];
  }, [data, currentTimeLine]);

  useEffect(() => {
    const timeLinePoints = document.querySelectorAll(
      ".timeLine__controller-point"
    );
    timeLinePoints.forEach((item, idx) => {
      item.addEventListener("click", () => {
        setCurrentTimeLine(idx);
      });
    });
  }, []);

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
    <article className="container-mobile">
      <h1 className="mobile-title">
        Исторические
        <br />
        даты
      </h1>
      <div className="years__mobile">
        <span className="years__mobile-first">{events.events[0].year}</span>
        <span className="years__mobile-second">
          {events.events[events.events.length - 1].year}
        </span>
      </div>
      <div className="theme-mobile">
        <h3 className="theme-mobile__title">{events.title}</h3>
        <hr className="theme-mobile__line" />
      </div>

      <EventsSwiper events={events.events} isNavigation={false} sliders={2} />
      <div className="timeLine-mobile">
        <div className="timeLineNavigationContainer">
          <span className="timeLine__title">
            0{currentTimeLine + 1}/0{data.length}
          </span>
          <div className="timeLine__navigation">
            <button
              className="timeLine__navigation-btn"
              onClick={() => handleChangeTimeLine(false)}
            >
              {"<"}
            </button>
            <button
              className="timeLine__navigation-btn"
              onClick={() => handleChangeTimeLine(true)}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className="timeLine__controller">
          {data.map((item, idx) => (
            <span
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

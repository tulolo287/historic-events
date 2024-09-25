import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import React, { useMemo, useRef, useState } from "react";
import data from "../../data";
import { EventsSwiper } from "../EventsSwiper";
import "./styles.scss";

gsap.registerPlugin(MotionPathPlugin);

export const HistoricEvents = () => {
  const [currentTimeLine, setCurrentTimeLine] = useState(0);

  const svgSize = { w: 600, h: 600 };
  const viewBoxSize = `0 0 ${svgSize.w} ${svgSize.h}`;
  const circleSize = {
    radius: 264.5,
    cx: svgSize.w * 0.5,
    cy: svgSize.h * 0.5,
  };

  let degree = 360 / data.length;
  let rad = 0;

  let x = 0;
  let y = 0;
  const topPos = 310;
  let degreeModule = 0;
  let rotatedDegree = 0;

  const container = useRef<any>();

  const events = useMemo(() => {
    return data[currentTimeLine].events;
  }, [data, currentTimeLine]);

  function degreesToRadians(degrees: number) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  function rotateCircle(idx: number) {
    setCurrentTimeLine(idx);
    degreeModule = rotatedDegree % 360;
    let degreesToUp = topPos - (degreeModule + degree * idx - 50);
    rotatedDegree += degreesToUp;

    gsap.to("#master", {
      duration: 1,
      rotation: rotatedDegree,
      svgOrigin: "0 0",
      ease: "none",
    });
    gsap.to("#master > g", {
      duration: 1,
      rotation: -rotatedDegree,
      transformOrigin: "50%",
      ease: "none",
    });
  }

  useGSAP(
    () => {
      const circleGroups = gsap.utils.toArray<HTMLElement>(".circleGroup");
      gsap.set("#mainGroup", {
        x: circleSize.cx,
        y: circleSize.cy,
        transformOrigin: "50",
      });
      circleGroups.forEach((item, idx) => {
        rad = degreesToRadians(degree * idx - 50);

        x = Math.cos(rad) * 264.5;
        y = Math.sin(rad) * 264.5;

        gsap.set(item, {
          x,
          y,
        });

        item.addEventListener("click", () => {
          rotateCircle(idx);
        });
      });
    },
    { scope: container }
  );

  function handleChangeTimeLine(isNext: boolean) {
    if (isNext && currentTimeLine < data.length - 1) {
      rotateCircle(currentTimeLine + 1);
    } else if (isNext) {
      rotateCircle(0);
    }
    if (!isNext && currentTimeLine > 0) {
      rotateCircle(currentTimeLine - 1);
    } else if (!isNext) {
      rotateCircle(data.length - 1);
    }
  }
  return (
    <article className="wrapper">
      <div className="circleBlock__header">
        <h1 className="circleBlock__header-text">
          Исторические
          <br />
          даты
        </h1>
      </div>
      <div className="circleBlock">
        <div className="circleBlock__years">
          <span className="circleBlock__years-first">{events[0].year}</span>
          <span className="circleBlock__years-second">
            {events[events.length - 1].year}
          </span>
        </div>
        <div className="circleBlock__circle" ref={container}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={svgSize.w}
            height={svgSize.h}
            viewBox={viewBoxSize}
          >
            <g id="mainGroup" fill="none">
              <circle
                id="bigCircle"
                opacity="0.2"
                r={circleSize.radius}
                stroke="#42567A"
              />
              <g id="master">
                {data.map((item, idx) => (
                  <g
                    className={`circleGroup${
                      currentTimeLine === idx ? " circleActive" : ""
                    }`}
                  >
                    <circle fill="red" className="circle" r="6" />
                    <text
                      className="textTitle"
                      text-anchor="middle"
                      fill="black"
                      fontSize="10"
                    >
                      {item.title}
                    </text>
                    <text
                      className="textNumber"
                      text-anchor="middle"
                      fill="black"
                      y="7"
                      fontSize="12"
                    >
                      {idx + 1}
                    </text>
                  </g>
                ))}
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="timeLine">
        <span className="timeLine__title">
          0{currentTimeLine + 1}/0{data.length}
        </span>
        <div className="timeLine__btnWrapper">
          <button
            className="timeLine__btn"
            onClick={() => handleChangeTimeLine(false)}
          >
            {"<"}
          </button>
          <button
            className="timeLine__btn"
            onClick={() => handleChangeTimeLine(true)}
          >
            {">"}
          </button>
        </div>
      </div>
      <EventsSwiper events={events} isNavigation={true} />
    </article>
  );
};

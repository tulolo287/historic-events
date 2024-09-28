import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { Events } from "../../types";
import { degreesToRadians } from "../../utils";
import { AnimatedText } from "../animated-text/AnimatedText";

export const TimeLineCircle = ({
  setCurrentTimeLine,
  timeLine,
  data,
}: {
  setCurrentTimeLine: any;
  timeLine: number;
  data: Events[];
}) => {
  const container = useRef<any>();
  const tl = useRef<any>();
  const { contextSafe } = useGSAP({ scope: container });

  let degree = 360 / data.length;
  let rad = 0;
  let x = 0;
  let y = 0;
  const topPos = 310;
  let degreeModule = 0;
  let rotatedDegree = 0;

  useEffect(() => {
    rotateCircle(timeLine);
  }, [timeLine]);

  function rotateCircle(idx: number) {
    degreeModule = rotatedDegree % 360;
    let degreesToUp = topPos - (degreeModule + degree * idx - 50);
    rotatedDegree += degreesToUp;

    gsap.to("#bigCircle", {
      duration: 1,
      rotation: rotatedDegree,
      transformOrigin: "center",
      ease: "none",
    });
    gsap.to("#bigCircle > div", {
      duration: 1,
      rotation: -rotatedDegree,
      transformOrigin: "center",
      ease: "none",
    });
    gsap.to(".textTitle", {
      visibility: "hidden",
    });
    gsap.to(".circleActive .textTitle", {
      delay: 1,
      visibility: "visible",
    });
  }

  useGSAP(
    () => {
      const circleGroups = gsap.utils.toArray<HTMLElement>(".circleGroup");

      circleGroups.forEach((item, idx) => {
        rad = degreesToRadians(degree * idx - 50);
        x = Math.cos(rad) * 264.5;
        y = Math.sin(rad) * 264.5;

        gsap.set(item, {
          x,
          y,
        });

        item.addEventListener("click", () => {
          setCurrentTimeLine(idx);
        });
      });
    },
    { scope: container }
  );

  return (
    <div className="circleBlock" ref={container}>
      <AnimatedText
        timeLine={timeLine}
        startYear={data[timeLine].events[0].year}
        endYear={data[timeLine].events[data[timeLine].events.length - 1].year}
      />
      <div id="bigCircle">
        {data.map((item, idx) => (
          <div key={idx}
            className={`circleGroup${timeLine === idx ? " circleActive" : ""}`}
          >
            <div className="circle">
              <span className="textNumber">{idx + 1}</span>
              <span className="textTitle">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

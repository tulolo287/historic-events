import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Events } from "../../types";
import { degreesToRadians } from "../../utils";
import { AnimatedText } from "../animated-text/AnimatedText";
import "./styles.scss";

let rotatedDegree = 0;

export const TimeLineCircle = ({
  setCurrentTimeLine,
  currentTimeLine,
  data,
}: {
  setCurrentTimeLine: (idx: number) => void;
  currentTimeLine: number;
  data: Events[];
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const bigCircle = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP({ scope: container });
  const [tl, setTl] = useState<gsap.core.Timeline>(null);

  let degree = 360 / data.length;
  let rad = 0;
  let x = 0;
  let y = 0;
  const topPos = 310;
  let degreeModule = 0;

  const startYear = data[currentTimeLine]?.events[0]?.year || "No start year";
  const endYear =
    data[currentTimeLine]?.events[data[currentTimeLine]?.events.length - 1]
      ?.year || "No end year";

  useLayoutEffect(() => {
    rotateCircle(currentTimeLine);
  }, [data, currentTimeLine]);

  const rotateCircle = contextSafe((idx: number) => {
    degreeModule = rotatedDegree % 360;
    let degreesToUp = topPos - (degreeModule + degree * idx - 50);
    rotatedDegree += degreesToUp;
    const q = gsap.utils.selector(bigCircle.current);

    gsap.to(bigCircle.current, {
      duration: 1,
      rotation: rotatedDegree,
      transformOrigin: "center",
    });
    gsap.to(q(".circleGroup"), {
      duration: 1,
      rotation: -rotatedDegree,
      transformOrigin: "center",
    });
    gsap.to(q(".textTitle"), {
      visibility: "hidden",
    });
    gsap.to(q(".circleActive .textTitle"), {
      delay: 1,
      visibility: "visible",
    });
  });

  useGSAP(
    () => {
      const tl = gsap.timeline();
      setTl(tl);
      const circleGroups = gsap.utils.toArray<HTMLElement>(".circleGroup");

      circleGroups.forEach((item, idx) => {
        rad = degreesToRadians(degree * idx - 50);
        x = Math.cos(rad) * 264.5;
        y = Math.sin(rad) * 264.5;
        gsap.set(item, {
          x,
          y,
        });
      });
    },
    { scope: container }
  );

  return (
    <div className="circleBlock" ref={container}>
      <AnimatedText
        startYear={startYear}
        endYear={endYear}
      />
      <div ref={bigCircle} className="bigCircle">
        {data?.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentTimeLine(idx)}
            className={`circleGroup${
              currentTimeLine === idx ? " circleActive" : ""
            }`}
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

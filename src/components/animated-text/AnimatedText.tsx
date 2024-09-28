import React, { useRef } from 'react'
import line from "../../assets/line.svg";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import './styles.scss';

export const AnimatedText = ({timeLine, startYear, endYear}: {timeLine: number, startYear: number, endYear: number}) => {
   const noRevert = useRef();

   useGSAP(() => {
     gsap.to('.font-year__big', {
       scale: 3,
       rotation: 44,
     });
   }, [timeLine]);

   return (
   <div className="circleBlock__years">
   <div className="svgLineRight">
     <img src={line} />
   </div>
   <span className="font-year__big blue mr80">{startYear}</span>
   <span className="font-year__big pink">
     {endYear}
   </span>
 </div>
  )
}


import React, { Fragment } from "react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Event } from "../../types";
import { Button } from "../ui/button/Button";
import "./styles.scss";

type EventsSwiperProps = {
  events: Event[];
  isNavigation?: boolean;
  sliders?: number;
};

export const EventsSwiper = ({
  events,
  isNavigation,
  sliders = 3,
}: EventsSwiperProps) => {
  const isNav = isNavigation
    ? {
        nextEl: ".image-swiper-button-next",
        prevEl: ".image-swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      }
    : false;
  return (
    <>
      <div style={{ height: "200px", position: "relative" }}>
        {isNav && (
          <>
            <div className="image-swiper-button-prev">
              <Button className="swiper-button" timeLine={1}/>
            </div>
            <div className="image-swiper-button-next">
              <Button className="swiper-button" right={true} />
            </div>
          </>
        )}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={sliders}
          navigation={isNav}
        >
          {events.map((event, idx) => (
            <Fragment key={idx}>
              <SwiperSlide>
                <div className="swiper">
                  <h3 className="font-year">{event.year}</h3>
                  <p className="l">{event.text}</p>
                </div>
              </SwiperSlide>
            </Fragment>
          ))}
        </Swiper>
      </div>
    </>
  );
};

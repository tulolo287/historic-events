import React from "react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Event } from "../../types";
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
            <div className="swiper-button image-swiper-button-next">
              <button className="timeLine__btn">{">"}</button>
            </div>
            <div className="swiper-button image-swiper-button-prev">
              <button className="timeLine__btn">{"<"}</button>
            </div>
          </>
        )}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={sliders}
          navigation={isNav}
        >
          {events.map((event) => (
            <>
              <SwiperSlide>
                <div className="swiper">
                  <h3 className="swiper__year">{event.year}</h3>
                  <p className="swiper__text">{event.text}</p>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
      </div>
    </>
  );
};

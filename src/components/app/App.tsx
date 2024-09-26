import React from "react";
import { useMobile } from "../../hooks/useMobile";
import { HistoricEvents } from "../historic-events/HistoricEvents";
import { HistoricEventsMobile } from "../historic-events-mobile/HistoricEventsMobile";

export const App = () => {
  const { isMobile } = useMobile();
  return (
    <main>{isMobile ? <HistoricEventsMobile /> : <HistoricEvents />}</main>
  );
};

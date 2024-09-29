import React from "react";
import { useMobile } from "../../hooks/useMobile";
import { HistoricEventsMobile } from "components/historic-events-mobile/HistoricEventsMobile";
import { HistoricEvents } from "../historic-events/HistoricEvents";

export const App = () => {
  const { isMobile } = useMobile();
  return (
    <main>{isMobile ? <HistoricEventsMobile /> : <HistoricEvents />}</main>
  );
};

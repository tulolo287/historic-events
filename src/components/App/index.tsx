import React from "react";
import { useMobile } from "../../hooks/useMobile";
import { HistoricEvents } from "../HistoricEvents";
import { HistoricEventsMobile } from "../HistoricEventsMobile";

export const App = () => {
  const { isMobile } = useMobile();
  return (
    <main>{isMobile ? <HistoricEventsMobile /> : <HistoricEvents />}</main>
  );
};

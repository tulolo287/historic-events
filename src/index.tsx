import { App } from "components/app/App";
import React from "react";
import { createRoot } from "react-dom/client";
import "styles/index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

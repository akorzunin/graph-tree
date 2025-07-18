import React from "react";
import ReactDOM from "react-dom/client";
import { ForceGraph } from "./components/ForceGraph";
import { MenuBar } from "./components/MenuBar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MenuBar />
    <ForceGraph />
  </React.StrictMode>
);

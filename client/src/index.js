import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FlexxusApp from "./FlexxusApp";
import { MyFlexxusProvider } from "./Provider/MyProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MyFlexxusProvider>
      <FlexxusApp />
    </MyFlexxusProvider>
  </React.StrictMode>
);

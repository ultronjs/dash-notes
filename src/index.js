import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProviderWrapper } from "./ProviderWrapper";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

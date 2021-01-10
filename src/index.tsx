import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import KeycloakManager from "./keycloak-manager";

KeycloakManager.createInstance("realm1", {
  clientId: "realm1-client",
  realm: "realm1",
  url: "http://localhost:8080/auth",
});

KeycloakManager.createInstance("realm2", {
  clientId: "realm2-client",
  realm: "realm2",
  url: "http://localhost:8080/auth",
});

const initKeyCloak = () => {
  KeycloakManager.initManager(renderApplication);
};

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

initKeyCloak();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

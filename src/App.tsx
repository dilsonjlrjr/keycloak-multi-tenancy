import React, { FC, useEffect, useState } from "react";
import KeycloakManager from "./keycloak-manager";

const App: FC = () => {
  const [_isAuthenticateRealm1, setAuthenticateRealm1] = useState<
    boolean | undefined
  >(false);

  const [_isAuthenticateRealm2, setAuthenticateRealm2] = useState<
    boolean | undefined
  >(false);

  const handleButtonRealm1 = async () => {
    KeycloakManager.login("realm1");
  };
  const handleButtonRealm2 = async () => {
    KeycloakManager.login("realm2");
  };

  const handleButtonLogoutRealm1 = async () => {
    KeycloakManager.logout("realm1");
  };
  const handleButtonLogoutRealm2 = async () => {
    KeycloakManager.logout("realm2");
  };

  useEffect(() => {
    setAuthenticateRealm1(KeycloakManager.getInstance("realm1")?.authenticated);
    setAuthenticateRealm2(KeycloakManager.getInstance("realm2")?.authenticated);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ padding: "10px" }}>
        <button type="button" onClick={handleButtonRealm1}>
          Login REALM1
        </button>
        <br />
        <span>
          Situação Realm1: {_isAuthenticateRealm1 ? "Logado" : "Não Logado"}
        </span>
        <br />
        <button type="button" onClick={handleButtonLogoutRealm1}>
          Logout REALM1
        </button>
      </div>

      <div style={{ padding: "10px" }}>
        <button type="button" onClick={handleButtonRealm2}>
          Login REALM2
        </button>
        <br />
        <span>
          Situação Realm2: {_isAuthenticateRealm2 ? "Logado" : "Não Logado"}
        </span>
        <br />
        <button type="button" onClick={handleButtonLogoutRealm2}>
          Logout REALM2
        </button>
      </div>
    </div>
  );
};

export default App;

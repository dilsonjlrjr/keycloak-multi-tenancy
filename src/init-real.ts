import Keycloak from "keycloak-js";

const keyCloackRealm1 = Keycloak({
  clientId: "realm1-client",
  realm: "realm1",
  url: "http://localhost:8080/auth",
});

const keyCloackRealm2 = Keycloak({
  clientId: "realm2-client",
  realm: "realm2",
  url: "http://localhost:8080/auth",
});

export { keyCloackRealm1, keyCloackRealm2 };

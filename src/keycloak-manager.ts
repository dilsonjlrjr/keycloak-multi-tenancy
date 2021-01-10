import Keycloak, { KeycloakConfig, KeycloakInstance } from "keycloak-js";

interface IKeycloakManager {
  getInstance: (realm: string) => KeycloakInstance | undefined;
  createInstance: (realm: string, config: KeycloakConfig) => void;
  initManager: (callback: Function) => void;
  login: (realm: string) => void;
  logout: (realm: string) => void;
}

let keyCloakInstance: Map<string, KeycloakInstance> = new Map();

const KeycloakManager: IKeycloakManager = {
  getInstance: (realm: string) => {
    return keyCloakInstance.get(realm);
  },

  createInstance: (realm: string, config: KeycloakConfig) => {
    keyCloakInstance.set(realm, Keycloak(config));
  },

  login: async (realm: string) => {
    localStorage.setItem("active-realm", realm);
    await keyCloakInstance.get(realm)?.login();
  },

  logout: async (realm: string) => {
    localStorage.removeItem("active-realm");
    await keyCloakInstance.get(realm)?.logout();
  },

  initManager: async (callback: Function) => {
    const realm = localStorage.getItem("active-realm");

    if (!realm) {
      keyCloakInstance.forEach(async (value) => {
        await value.init({
          silentCheckSsoFallback: true,
        });
      });

      callback();
    } else {
      keyCloakInstance.forEach(async (instance, key) => {
        if (key === realm) {
          await instance
            .init({
              checkLoginIframe: false,
              onLoad: "login-required",
            })
            .then((value) => {
              callback();
            });
        } else {
          instance.init({
            silentCheckSsoFallback: true,
          });
        }
      });
    }
  },
};

export default KeycloakManager;

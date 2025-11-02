import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URL,
  response_type: import.meta.env.VITE_COGNITO_RESPONSE_CODE,
  scope: import.meta.env.VITE_COGNITO_SCOPE,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig} onSigninCallback={onSigninCallback}>
      <App />
    </AuthProvider>
  // </React.StrictMode>
);

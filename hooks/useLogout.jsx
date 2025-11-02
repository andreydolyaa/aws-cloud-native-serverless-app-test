
import { useAuth } from "react-oidc-context";

export const useLogout = () => {
  const auth = useAuth();

  const signOutRedirect = async () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URL;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    await auth.removeUser();
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  return { signOutRedirect };
};


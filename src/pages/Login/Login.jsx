import { useAuth } from "react-oidc-context";
import { useLogout } from "../../../hooks/useLogout";

export const Login = () => {
  const auth = useAuth();
  const { signOutRedirect } = useLogout();

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
};

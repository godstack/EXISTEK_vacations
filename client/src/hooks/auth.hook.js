import { useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback(
    (jwtToken, incomingUser) => {
      setUser(incomingUser);
      setToken(jwtToken);

      localStorage.setItem(
        auth.storageName,
        JSON.stringify({
          user: incomingUser,
          token: jwtToken
        })
      );
    },
    [auth.storageName]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(auth.storageName);
  }, [auth.storageName]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(auth.storageName));

    if (data && data.token) {
      login(data.token, data.user);
    }
  }, [login, auth.storageName]);

  return { login, logout, token, user };
};

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { apiLogin, apiSignup } from "../services/api";
import { clearAuthToken, getAuthToken, setAuthToken } from "../services/authStorage";

const AuthContext = createContext(null);

/** PUBLIC_INTERFACE */
export function AuthProvider({ children }) {
  /** Provides auth state + actions to the app. */
  const [token, setToken] = useState(() => getAuthToken());
  const [user, setUser] = useState(null);

  const isAuthed = !!token;

  const login = useCallback(async ({ email, password }) => {
    const data = await apiLogin({ email, password });
    const maybeToken = data?.token || data?.accessToken || data?.jwt || getAuthToken();
    if (maybeToken) {
      setAuthToken(maybeToken);
      setToken(maybeToken);
    }
    // best-effort user
    if (data?.user) setUser(data.user);
    else setUser((prev) => prev ?? { email });
    return data;
  }, []);

  const signup = useCallback(async ({ email, password, name }) => {
    const data = await apiSignup({ email, password, name });
    const maybeToken = data?.token || data?.accessToken || data?.jwt;
    if (maybeToken) {
      setAuthToken(maybeToken);
      setToken(maybeToken);
    }
    if (data?.user) setUser(data.user);
    else setUser((prev) => prev ?? { email, name });
    return data;
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setToken("");
    setUser(null);
  }, []);

  const setRawToken = useCallback((newToken) => {
    if (newToken) {
      setAuthToken(newToken);
      setToken(newToken);
    } else {
      clearAuthToken();
      setToken("");
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthed,
      user,
      login,
      signup,
      logout,
      setRawToken,
    }),
    [token, isAuthed, user, login, signup, logout, setRawToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** PUBLIC_INTERFACE */
export function useAuth() {
  /** Hook to access auth context. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

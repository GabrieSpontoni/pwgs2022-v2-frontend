import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { setCookies, getCookie, removeCookies } from "cookies-next";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const token = getCookie("pwgs22Token");
    if (token) {
      await axios
        .get(`${process.env.BASE_URL}/user/me/?token=` + token)
        .then((res) => {
          setUser(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [setUser]);

  const createUser = async (displayName, email, password) => {
    setLoading(true);
    await axios
      .post(`${process.env.BASE_URL}/register`, {
        name: displayName,
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(res.data.user);
        setCookies("pwgs22Token", res.data.user.token);
        router.push("/isolated-tasks");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message.msg);
        setLoading(false);
      });
  };

  const loginWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    await axios
      .post(`${process.env.BASE_URL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(res.data.user);
        setCookies("pwgs22Token", res.data.user.token);
        router.push("/isolated-tasks");
      })
      .catch((err) => {
        console.log(err);
        setError("Usuário ou senha inválidos");
        setLoading(false);
      });
  };

  const logout = async () => {
    removeCookies("pwgs22Token");
    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    error,
    loading,
    loginWithEmailAndPassword,
    logout,
    createUser,
  };

  return <authContext.Provider value={value} {...props} />;
}

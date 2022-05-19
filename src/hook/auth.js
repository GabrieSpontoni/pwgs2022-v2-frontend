import { createContext, useState, useContext, useEffect } from "react";

import axios from "axios";
import { setCookies, getCookie, removeCookies } from "cookies-next";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const token = getCookie("pwgs22Token");
    if (token) {
      await axios
        .get("http://localhost:3001/user/me/?token=" + token)
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

    // onAuthStateChanged(auth, (usr) => {
    //   if (usr && usr.displayName) {
    //     setUser(usr);
    //     setLoading(false);
    //   } else {
    //     setUser(null);
    //     setLoading(false);
    //   }
    // });
  }, [setUser]);

  const createUser = async (displayName, email, password) => {
    await axios
      .post(`http://localhost:3001/register`, {
        name: displayName,
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(res.data.user);
        setCookies("pwgs22Token", res.data.user.token);
        window.location.href = "/isolated-tasks";
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message.msg);
      });

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(() => {
    //     updateProfile(auth.currentUser, {
    //       displayName: displayName,
    //     })
    //       .then((usr) => {
    //         console.log("User profile updated");
    //         window.location.href = "/isolated-tasks";
    //       })
    //       .catch((error) => {
    //         console.log("Error updating user profile");
    //       });
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });
  };

  const loginWithEmailAndPassword = async (email, password) => {
    await axios
      .post(`http://localhost:3001/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setUser(res.data.user);
        setCookies("pwgs22Token", res.data.user.token);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Usuário ou senha inválidos");
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

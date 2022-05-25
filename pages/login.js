import { useEffect } from "react";

import Spinner from "../src/app/main/common/spinner/Spinner";
import LoginForm from "../src/app/main/login/LoginForm";
import useAuth from "../src/hook/auth";

export default function Login() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/isolated-tasks";
    }
  });
  return (
    <div>
      {loading && <Spinner />}
      {!loading && <LoginForm />}
    </div>
  );
}

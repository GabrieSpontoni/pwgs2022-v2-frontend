import LoginForm from "../src/app/main/login/LoginForm";
import useAuth from "../src/hook/auth";
import { useEffect } from "react";

export default function Login() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/isolated-tasks";
    }
  });
  return <LoginForm />;
}

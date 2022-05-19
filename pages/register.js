import RegisterForm from "../src/app/main/register/RegisterForm";
import useAuth from "../src/hook/auth";
import { useEffect } from "react";

export default function Register() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/isolated-tasks";
    }
  });
  return <RegisterForm />;
}

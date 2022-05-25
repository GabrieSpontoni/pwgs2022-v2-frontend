import { useEffect } from "react";

import Spinner from "../src/app/main/common/spinner/Spinner";
import RegisterForm from "../src/app/main/register/RegisterForm";
import useAuth from "../src/hook/auth";

export default function Register() {
  const { user, loading } = useAuth();
  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/isolated-tasks";
    }
  });
  return (
    <div>
      {loading && <Spinner />}
      {!loading && <RegisterForm />}
    </div>
  );
}

import { useEffect } from "react";
import useAuth from "../src/hook/auth";

import ProgressGeneral from "../src/app/main/general-progress/GeneralProgress";

export default function GeneralProgress() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/";
    }
  });
  return <ProgressGeneral />;
}

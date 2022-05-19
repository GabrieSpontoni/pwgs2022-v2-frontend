import { useEffect } from "react";
import useAuth from "../src/hook/auth";

import IsoTasks from "../src/app/main/isolated-tasks/IsolatedTasks";

export default function IsolatedTasks() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/";
    }
  });
  return <IsoTasks />;
}

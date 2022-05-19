import { useEffect } from "react";
import useAuth from "../src/hook/auth";

import LisTasks from "../src/app/main/list-tasks/ListTasks";

export default function ListTasks() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/";
    }
  });
  return <LisTasks />;
}

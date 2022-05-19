import { useEffect } from "react";
import useAuth from "../src/hook/auth";

import ShareTasks from "../src/app/main/share/Share";

export default function Share() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/";
    }
  });
  return <ShareTasks />;
}

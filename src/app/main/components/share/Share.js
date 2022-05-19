import { useState } from "react";

import PublicTasks from "./components/public-tasks/PublicTasks";
import PrivateTasks from "./components/private-tasks/PrivateTasks";
import styles from "./Share.module.css";

export default function Tasks() {
  const [activeBar, setActiveBar] = useState("public");

  return (
    <div>
      <div className={styles.container}>
        <h3 className="mb-2 text-muted">Compartilhamento de Listas</h3>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeBar === "public" ? "active" : ""}`}
              onClick={() => {
                setActiveBar("public");
              }}
            >
              Listas públicas
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeBar === "private" ? "active" : ""}`}
              onClick={() => {
                setActiveBar("private");
              }}
            >
              Minhas listas
            </button>
          </li>
        </ul>

        {activeBar === "public" && <PublicTasks />}

        {activeBar === "private" && <PrivateTasks />}
      </div>
    </div>
  );
}

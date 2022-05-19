import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>TO-DO</h4>
            <button
              onClick={() => {
                setShow(false);
              }}
              type="button"
              className="btn btn-outline-secondary"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/isolated-tasks"
              >
                Tarefas isoladas
              </a>
            </li>
            <hr />
            <li className="nav-item">
              <a className="nav-link" href="/list-tasks">
                Lista de tarefas
              </a>
            </li>
            <hr />
            <li className="nav-item">
              <a className="nav-link" href="/general-progress">
                Andamento geral
              </a>
            </li>
            <hr />
            <li className="nav-item">
              <a className="nav-link" href="#">
                Compartilhar
              </a>
            </li>

            <hr />
          </ul>
        </div>
      )}

      {!show && (
        <div className={styles.hamburguer}>
          <button
            onClick={() => {
              setShow(true);
            }}
            type="button"
            className="btn btn-outline-secondary"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}
    </div>
  );
}

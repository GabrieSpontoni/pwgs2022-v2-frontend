import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import useAuth from "../../../../hook/auth";
import ModalSearch from "./components/ModalSearch";

export default function Sidebar() {
  const { user, loading, logout } = useAuth();
  const [name, setName] = useState("-");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // setName(
    //   user?.displayName.split(" ")[0] + " " + user?.displayName.split(" ")[1]
    // );
    const name = user?.displayName.split(" ");
    if (name) {
      setName(name[0] + " " + name[name.length - 1]);
    }
  });

  const handleLogout = () => {
    logout();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return (
    <div
      style={{
        marginTop: "10px",
        marginLeft: "10px",
      }}
    >
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            <button
              onClick={handleShow}
              type="button"
              className="btn btn-outline-secondary"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>{" "}
            <FontAwesomeIcon
              className="d-inline-block align-text-top"
              icon={faUser}
            />{" "}
            {name}{" "}
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Sair
            </button>
          </a>

          <ModalSearch
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>
      </nav>

      <Offcanvas
        style={{
          backgroundColor: "#f1f1fe",
        }}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TO-DO</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/isolated-tasks">
                <a className="nav-link">Tarefas isoladas</a>
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link href="/list-tasks">
                <a className="nav-link">Lista de tarefas</a>
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link href="/general-progress">
                <a className="nav-link">Andamento geral</a>
              </Link>
            </li>
            <hr />
            <li className="nav-item">
              <Link href="/share">
                <a className="nav-link">Compartilhar</a>
              </Link>
            </li>
            <hr />
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

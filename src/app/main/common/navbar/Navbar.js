import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import useAuth from "../../../../hook/auth";

export default function Sidebar() {
  const { user, loading, logout } = useAuth();
  const [name, setName] = useState("-");

  useEffect(() => {
    setName(
      user?.displayName.split(" ")[0] + " " + user?.displayName.split(" ")[1]
    );
  });

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand">
          <FontAwesomeIcon
            className="d-inline-block align-text-top"
            icon={faUser}
          />{" "}
          {name}{" "}
          <button onClick={handleLogout} className="btn btn-outline-danger">
            Sair
          </button>
        </a>
        {/* <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
}

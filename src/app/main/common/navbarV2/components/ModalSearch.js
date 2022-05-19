import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import useAuth from "../../../../../hook/auth";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function ModalSearch({
  showModal,
  handleCloseModal,
  handleShowModal,
}) {
  const { user } = useAuth();
  const [isolatedTasks, setIsolatedTasks] = useState({});
  const [listTasks, setListTasks] = useState({});
  const [wordToSearch, setWordToSearch] = useState("");

  const token = getCookie("pwgs22Token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleShowModal();
    setWordToSearch(e.target[0].value);

    await axios
      .get(`http://localhost:3001/isolated-tasks?token=${token}`)
      .then((response) => {
        // console.log(response.data.data);
        setIsolatedTasks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:3001/lists?token=${token}`)
      .then((response) => {
        // console.log(response.data.data);
        setListTasks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Pesquisar"
          aria-label="Search"
          required
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar Tarefas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isolatedTasks &&
            Object.keys(isolatedTasks).map((keyTask) => (
              <div key={keyTask}>
                {isolatedTasks[keyTask].tarefa.includes(wordToSearch) && (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {isolatedTasks[keyTask].tarefa}
                      </h5>

                      <a href="/isolated-tasks" className="card-link">
                        Tarefas isoladas
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}

          {listTasks &&
            Object.keys(listTasks).length > 0 &&
            Object.keys(listTasks).map((keyList) => (
              <div key={keyList}>
                {console.log(listTasks[keyList])}
                {listTasks[keyList].ListTasks &&
                  Object.keys(listTasks[keyList].ListTasks).map((keyTask) => (
                    <div key={keyTask}>
                      {listTasks[keyList].ListTasks[keyTask].tarefa.includes(
                        wordToSearch
                      ) && (
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title">
                              {listTasks[keyList].ListTasks[keyTask].tarefa}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                              {listTasks[keyList].name}
                            </h6>

                            <a href="/list-tasks" className="card-link">
                              Lista de Tarefas
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

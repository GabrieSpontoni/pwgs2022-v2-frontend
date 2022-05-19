import { useState, useEffect } from "react";

import useAuth from "../../../../hook/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faDeleteLeft,
  faBan,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import ModalEdit from "../../common/modals/ModalEdit";
import ModalDelete from "../../common/modals/ModalDelete";
import Spinner from "../../common/spinner/Spinner";
import styles from "./ListTasks.module.css";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function Tasks() {
  const { user, loading } = useAuth();

  const [newList, setNewList] = useState("");
  const [allLists, setAllLists] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [deleteTask, setDeleteTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isForEditList, setIsForEditList] = useState({
    isForEditList: false,
    listId: "",
  });
  const [editList, setEditList] = useState("");
  const [loadingLists, setLoadingLists] = useState(true);

  const token = getCookie("pwgs22Token");

  useEffect(() => {
    let isMounted = true;

    if (user && !loading && isMounted) {
      axios
        .get(`http://localhost:3001/lists?token=${token}`)
        .then(function (response) {
          setAllLists(response.data.data);
          setLoadingLists(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoadingLists(false);
        });
      // onValue(
      //   ref(db, "usuarios/" + user.uid + "/tarefas_listas"),
      //   (snapshot) => {
      //     if (snapshot.val()) {
      //       setAllLists(snapshot.val());
      //       setLoadingLists(false);
      //     } else {
      //       setAllLists(null);
      //       setLoadingLists(false);
      //     }
      //   }
      // );
    }
    return () => {
      isMounted = false;
    };
  }, [user, loading, loadingLists]);

  const addList = (e) => {
    console.log(newList);
    setLoadingLists(true);

    axios
      .post("http://localhost:3001/lists", {
        token,
        name: newList,
        shared: false,
      })
      .then(() => {
        setNewList("");
        setLoadingLists(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingLists(false);
      });

    // const db = getDatabase();
    // const listTasksRef = ref(db, "usuarios/" + user.uid + "/tarefas_listas");
    // const newListTasksRef = push(listTasksRef);
    // set(newListTasksRef, {
    //   nome: newList,
    // })
    //   .then(() => {
    //     document.getElementById("newList").value = "";
    //   })
    //   .catch(() => {
    //     console.log("erro");
    //   });
    e.preventDefault();
  };

  const addTask = (e) => {
    setLoadingLists(true);

    axios
      .post("http://localhost:3001/list-tasks", {
        token,
        listId: newTask.lista_id,
        status: "nao_concluido",
        tarefa: newTask.tarefa,
        tempo_limite: "-",
        tags: [5],
      })
      .then(() => {
        setNewList("");
        setLoadingLists(false);
      })
      .catch((e) => {
        console.log(e);
        setLoadingLists(false);
      });

    e.preventDefault();
  };

  const getColorBtn = (color) => {
    switch (color) {
      case "branco":
        return "badge bg-dark";
      case "azul":
        return "badge bg-primary";
      case "verde":
        return "badge bg-success";
      case "amarelo":
        return "badge bg-warning text-dark";
      case "vermelho":
        return "badge bg-danger";
    }
  };

  const handleEditList = (e, id) => {
    setLoadingLists(true);

    axios
      .put(`http://localhost:3001/lists/`, {
        token,
        id,
        name: editList,
      })
      .then(() => {
        setEditList("");
        setLoadingLists(false);
        setIsForEditList({
          isForEditList: false,
          listId: "",
        });
      })
      .catch((e) => {
        console.log(e);
        setLoadingLists(false);
      });
    // const db = getDatabase();
    // const listTasksRef = ref(
    //   db,
    //   "usuarios/" + user.uid + "/tarefas_listas/" + key
    // );
    // update(listTasksRef, {
    //   nome: editList,
    // })
    //   .then(() => {
    //     setIsForEditList({
    //       isForEditList: false,
    //       listId: "",
    //     });
    //   })
    //   .catch(() => {
    //     console.log("erro");
    //   });
    e.preventDefault();
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (editTask, keyList, keyTask) => {
    setEditTask({
      keyList,
      key: keyTask,
      editTask,
    });
    setShowModal(true);
  };

  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = (deleteTask, keyList, keyTask) => {
    // console.log(deleteTask, keyList, keyTask);
    setDeleteTask({
      keyList,
      key: keyTask,
      deleteTask,
    });

    setShowModalDelete(true);
  };
  return (
    <div>
      {loadingLists && <Spinner />}

      {!loadingLists && (
        <div>
          <div className={styles.container}>
            <h3 className="mb-2 text-muted">Lista de Tarefas</h3>
          </div>
          <div className={styles.container}>
            <form onSubmit={addList}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label mb-2 text-muted"
                >
                  Nova Lista
                </label>

                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <input
                    id="newList"
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setNewList(e.target.value);
                    }}
                    required
                  />
                  <div>
                    <button type="submit" className="btn btn-success">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.container}>
            <label className="form-label mb-2 text-muted">Listas</label>

            {allLists &&
              Object.keys(allLists).map((key, index) => {
                return (
                  <div key={key} className="card">
                    <h5 className="card-header text-muted text-center">
                      {allLists[key].name}{" "}
                      <button
                        onClick={() => {
                          setIsForEditList({
                            isForEditList: true,
                            listId: key,
                          });
                        }}
                        type="button"
                        className="btn btn-warning"
                      >
                        Editar
                      </button>{" "}
                      <button
                        onClick={() => {
                          handleShowModalDelete(null, allLists[key].id, null);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        Excluir
                      </button>
                    </h5>
                    {isForEditList.isForEditList &&
                      isForEditList.listId === key && (
                        <h5 className="card-header text-muted text-center">
                          <form
                            onSubmit={(e) => {
                              handleEditList(e, allLists[key].id);
                            }}
                          >
                            <input
                              type="text"
                              placeholder="nome da lista"
                              defaultValue={allLists[key].name}
                              onChange={(e) => {
                                setEditList(e.target.value);
                              }}
                              required
                            />{" "}
                            <button type="submit" className="btn btn-success">
                              <FontAwesomeIcon icon={faCheck} />
                            </button>{" "}
                            <button
                              onClick={() => {
                                setIsForEditList(false);
                              }}
                              type="button"
                              className="btn btn-danger"
                            >
                              <FontAwesomeIcon icon={faBan} />
                            </button>{" "}
                          </form>
                        </h5>
                      )}
                    <form onSubmit={addTask}>
                      <div className="mb-3">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <input
                            type="text"
                            id={`${key}`}
                            placeholder="Nova Tarefa"
                            className="form-control"
                            onChange={(e) => {
                              setNewTask({
                                lista_id: allLists[key].id,
                                tarefa: e.target.value,
                              });
                            }}
                            required
                          />
                          <div>
                            <button type="submit" className="btn btn-success">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Tarefa</th>
                            <th scope="col">Tempo limite</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allLists[key].ListTasks &&
                            Object.keys(allLists[key].ListTasks).map(
                              (keyTask) => {
                                return (
                                  <tr key={keyTask}>
                                    <td>
                                      {allLists[key].ListTasks[keyTask].tarefa}
                                    </td>
                                    <td>
                                      {
                                        allLists[key].ListTasks[keyTask]
                                          .tempo_limite
                                      }
                                    </td>
                                    <td>
                                      {allLists[key].ListTasks[
                                        keyTask
                                      ].Tags.map((tag, index) => {
                                        return (
                                          <span
                                            key={index}
                                            className={getColorBtn(tag.tag)}
                                            style={{
                                              marginRight: "5px",
                                            }}
                                          >
                                            {tag.tag}
                                          </span>
                                        );
                                      })}
                                    </td>

                                    <td>
                                      {" "}
                                      {allLists[key].ListTasks[keyTask].status}
                                    </td>

                                    <td>
                                      <button
                                        onClick={() => {
                                          console.log(
                                            allLists[key].ListTasks[keyTask]
                                          );
                                          handleShowModal(
                                            allLists[key].ListTasks[keyTask],
                                            key,
                                            keyTask
                                          );
                                        }}
                                        type="button"
                                        className="btn btn-warning"
                                      >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                      </button>{" "}
                                      <button
                                        onClick={() => {
                                          handleShowModalDelete(
                                            allLists[key].ListTasks[keyTask],
                                            key,
                                            keyTask
                                          );
                                        }}
                                        type="button"
                                        className="btn btn-danger"
                                      >
                                        <FontAwesomeIcon icon={faDeleteLeft} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              }
                            )}

                          {/* {console.log(allLists)}
                          {allLists &&
                            allLists.map((task, index) => {
                              return (
                                <tr key={index}>
                                  <td>{console.log(task)}</td>
                                </tr>
                              );
                            })} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
          </div>

          <div>
            <ModalEdit
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              handleShowModal={handleShowModal}
              editTask={editTask}
              path="tarefas_listas"
            />
          </div>

          <div>
            <ModalDelete
              showModal={showModalDelete}
              handleCloseModal={handleCloseModalDelete}
              handleShowModal={handleShowModalDelete}
              deleteTask={deleteTask}
              path="tarefas_listas"
            />
          </div>
        </div>
      )}
    </div>
  );
}

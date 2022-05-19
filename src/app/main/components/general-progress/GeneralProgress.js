import { useState, useEffect } from "react";
import useAuth from "../../../../hook/auth";
import styles from "./GeneralProgress.module.css";
import Spinner from "../../common/spinner/Spinner";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function GeneralProgress() {
  const { user, loading } = useAuth();

  const [allTasks, setAllTasks] = useState(null);
  const [allLists, setAllLists] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);

  const token = getCookie("pwgs22Token");

  useEffect(() => {
    if (user && !loading) {
      axios
        .get(`http://localhost:3001/isolated-tasks?token=${token}`)
        .then(function (response) {
          setAllTasks(response.data.data);
          setLoadingTasks(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoadingTasks(false);
        });
    }
  }, [user, loading]);

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
  }, [user, loading]);

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

  const getColorRow = (status) => {
    switch (status) {
      case "nao_concluido":
        return "table-danger";
      case "concluido":
        return "table-success";
    }
  };
  return (
    <div>
      {loadingTasks && loadingLists && <Spinner />}

      {!loadingTasks && !loadingLists && (
        <div>
          <div className={styles.container}>
            <h3 className="mb-2 text-muted">Andamento Geral</h3>
          </div>

          <div className={styles.container}>
            <label className="form-label mb-2 text-muted">
              Tarefas Isoladas
            </label>
            <div className="table-responsive">
              <table className="table">
                {allTasks && (
                  <thead>
                    <tr>
                      <th scope="col">Tarefa</th>
                      <th scope="col">Tempo limite</th>
                      <th scope="col">Tags</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {allTasks &&
                    Object.keys(allTasks).map((key) => {
                      return (
                        <tr
                          key={key}
                          className={getColorRow(allTasks[key].status)}
                        >
                          <td>{allTasks[key].tarefa}</td>
                          <td>{allTasks[key].tempo_limite}</td>
                          <td>
                            {allTasks[key].Tags.map((tag, index) => {
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
                          <td>{allTasks[key].status}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.container}>
            <label className="form-label mb-2 text-muted">
              Listas de tarefas
            </label>
            {allLists &&
              Object.keys(allLists).map((key) => {
                return (
                  <div key={key} className="card">
                    <h5 className="card-header text-muted text-center">
                      {allLists[key].name}
                    </h5>
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
                                  <tr
                                    key={keyTask}
                                    className={getColorRow(
                                      allLists[key].ListTasks[keyTask].status
                                    )}
                                  >
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
                                    <td></td>
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

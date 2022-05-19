import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getCookie } from "cookies-next";

import useAuth from "../../../../../../../src/hook/auth";
import Spinner from "../../../../common/spinner/Spinner";

export default function PrivateTasks() {
  const { user, loading } = useAuth();

  const [allLists, setAllLists] = useState(null);
  const [loadingLists, setLoadingLists] = useState(true);

  const token = getCookie("pwgs22Token");

  useEffect(() => {
    let isMounted = true;
    if (user && !loading) {
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
    }
    return () => {
      isMounted = false;
    };
  }, [user, loading]);

  const handleShare = async (listId) => {
    await axios
      .put("http://localhost:3001/lists", {
        token,
        id: listId,
        shared: true,
      })
      .then(() => {
        console.log("Lista compartilhada com sucesso!");
        window.location.reload();
      })
      .catch(() => {
        console.log("Erro ao compartilhar lista!");
      });

    // set(ref(db, "compartilhados/listas/" + listId), {
    //   dados_lista: allLists[listId],
    //   dados_usuario: {
    //     usuario_nome: user.displayName,
    //     usuario_email: user.email,
    //     usuario_uid: user.uid,
    //   },
    // });

    // update(ref(db, "usuarios/" + user.uid + "/tarefas_listas/" + listId), {
    //   compartilhada: true,
    // });
  };

  const handleUnshare = async (listId) => {
    await axios
      .put("http://localhost:3001/lists", {
        token,
        id: listId,
        shared: false,
      })
      .then(() => {
        console.log("Lista descompartilhada");
        window.location.reload();
      })
      .catch(() => {
        console.log("Erro ao descompartilhar lista!");
      });
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
      {loadingLists && <Spinner />}

      {!loadingLists && (
        <div>
          <div>
            {allLists &&
              Object.keys(allLists).map((key) => {
                return (
                  <div key={key} className="card">
                    <h5 className="card-header text-muted text-center">
                      {allLists[key].name}{" "}
                      {!allLists[key].shared && (
                        <button
                          onClick={() => {
                            handleShare(allLists[key].id);
                          }}
                          type="button"
                          className="btn btn-success"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Compartilhar"
                        >
                          <FontAwesomeIcon icon={faShare} />
                        </button>
                      )}
                      {allLists[key].shared && (
                        <button
                          onClick={() => {
                            handleUnshare(allLists[key].id);
                            // setIsForEditList({
                            //   isForEditList: true,
                            //   listId: key,
                            // });
                          }}
                          type="button"
                          className="btn btn-danger"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Descompartilhar"
                        >
                          <FontAwesomeIcon icon={faLock} />
                        </button>
                      )}
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
                                    // className={getColorRow(
                                    //   allLists[key].ListTasks[keyTask].status
                                    // )}
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

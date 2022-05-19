import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getCookie } from "cookies-next";
import useAuth from "../../../../../../../src/hook/auth";
import Spinner from "../../../../common/spinner/Spinner";

export default function PublicTasks() {
  const { user, loading } = useAuth();

  const [allLists, setAllLists] = useState(null);
  const [loadingLists, setLoadingLists] = useState(true);

  const token = getCookie("pwgs22Token");

  useEffect(() => {
    let isMounted = true;
    if (user && !loading && isMounted) {
      axios
        .get(`${process.env.BASE_URL}/lists?token=${token}&shared=true`)
        .then((result) => {
          setAllLists(result.data.data);
          setLoadingLists(false);
        })
        .catch((e) => {
          console.log(e);
          setLoadingLists(false);
        });

      // onValue(ref(db, "compartilhados/listas/"), (snapshot) => {
      //   if (isMounted) {
      //     if (snapshot.val()) {
      //       setAllLists(snapshot.val());
      //       setLoadingLists(false);
      //     } else {
      //       setAllLists(null);
      //       setLoadingLists(false);
      //     }
      //   }
      // });
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
      {loadingLists && <Spinner />}

      {!loadingLists && (
        <div>
          <div>
            {allLists &&
              Object.keys(allLists).map((key) => {
                return (
                  <div key={key} className="card">
                    <h5 className="card-header text-muted text-center">
                      {allLists[key].name} ({allLists[key].User.displayName})
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
                                    //   allLists[key].dados_lista.tarefas[keyTask].status
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

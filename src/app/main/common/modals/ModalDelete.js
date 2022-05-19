import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { getCookie } from "cookies-next";

import useAuth from "../../../../hook/auth";

export default function ModalEdit({
  showModal,
  handleCloseModal,
  handleShowModal,
  deleteTask,
  path,
}) {
  const { user, loading } = useAuth();

  const handleDelete = async (e) => {
    const token = getCookie("pwgs22Token");

    if (token) {
      switch (path) {
        case "tarefas_isoladas":
          await axios
            .delete(
              `http://localhost:3001/isolated-tasks/${deleteTask.deleteTask.id}`,
              {
                data: {
                  token: token,
                },
              }
            )
            .then(() => {
              console.log("Tarefa deletada com sucesso");

              handleCloseModal();
              window.location.reload();
            })
            .catch((e) => {
              console.log(e);
            });
          break;
        case "tarefas_listas":
          if (deleteTask.key && deleteTask.deleteTask) {
            console.log("delete list task");

            axios
              .delete(`http://localhost:3001/list-tasks`, {
                data: {
                  token: token,
                  id: deleteTask.deleteTask.id,
                },
              })
              .then(() => {
                handleCloseModal();
                window.location.reload();
              })
              .catch(() => {
                console.log("erro");
              });

            //remove lista inteira
          } else {
            console.log("delete list");
            console.log(deleteTask);
            axios
              .delete(`http://localhost:3001/lists/`, {
                data: {
                  token: token,
                  id: deleteTask.keyList,
                },
              })
              .then(() => {
                handleCloseModal();
                window.location.reload();
              })
              .catch(() => {
                console.log("erro");
              });
            // remove(
            //   ref(
            //     db,
            //     `usuarios/${user.uid}/tarefas_listas/${deleteTask.keyList}`
            //   )
            // )
            //   .then(() => {
            //     handleCloseModal();
            //   })
            //   .catch(() => {
            //     console.log("erro");
            //   });
          }
          break;
      }
    }

    // switch (path) {
    //   case "tarefas_isoladas":
    //     remove(
    //       ref(db, `usuarios/${user.uid}/tarefas_isoladas/${deleteTask.key}`)
    //     )
    //       .then(() => {
    //         handleCloseModal();
    //       })
    //       .catch(() => {
    //         console.log("erro");
    //       });
    //     break;
    //   case "tarefas_listas":
    //     if (deleteTask.key && deleteTask.deleteTask) {
    //       remove(
    //         ref(
    //           db,
    //           `usuarios/${user.uid}/tarefas_listas/${deleteTask.keyList}/tarefas/${deleteTask.key}`
    //         )
    //       )
    //         .then(() => {
    //           handleCloseModal();
    //         })
    //         .catch(() => {
    //           console.log("erro");
    //         });

    //       //remove lista inteira
    //     } else {
    //       remove(
    //         ref(db, `usuarios/${user.uid}/tarefas_listas/${deleteTask.keyList}`)
    //       )
    //         .then(() => {
    //           handleCloseModal();
    //         })
    //         .catch(() => {
    //           console.log("erro");
    //         });
    //     }
    //     break;
    // }
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Deletar</Modal.Title>
          </Modal.Header>

          <Modal.Body>A operação não pode ser desfeita</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleDelete}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

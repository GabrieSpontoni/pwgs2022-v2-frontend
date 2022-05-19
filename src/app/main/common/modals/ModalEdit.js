import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import axios from "axios";
import { getCookie } from "cookies-next";
import useAuth from "../../../../hook/auth";

export default function ModalEdit({
  showModal,
  handleCloseModal,
  handleShowModal,
  editTask,
  path,
}) {
  const { user, loading } = useAuth();
  const [errorForm, setErrorForm] = useState({
    errorTags: false,
  });

  const [form, setForm] = useState({
    tarefa: "",
    tempo_limite: "",
    tags: [
      {
        tag: "",
        id: "",
      },
    ],
    status: "",
  });

  useEffect(() => {
    if (editTask) {
      // console.log(editTask);
      setForm({
        tarefa: editTask.editTask.tarefa,
        tempo_limite: editTask.editTask.tempo_limite,
        tags: editTask.editTask.Tags,
        status: editTask.editTask.status,
      });

      // switch (path) {
      //   case "tarefas_isoladas":
      //     setForm({
      //       tarefa: editTask.editTask.tarefa,
      //       tempo_limite: editTask.editTask.tempo_limite,
      //       tags: editTask.editTask.tags,
      //       status: editTask.editTask.status,
      //     });
      //     break;
      //   case "tarefas_listas":
      //     console.log("entrou");
      //     setForm({
      //       tarefa: editTask.editTask.tarefa,
      //       tempo_limite: editTask.editTask.tempo_limite,
      //       tags: editTask.editTask.tags,
      //       status: editTask.editTask.status,
      //     });
      // }
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const colorsIds = [];
    if (form.tags.length === 0) {
      setErrorForm({
        ...errorForm,
        errorTags: true,
      });
      console.log("erro");
    } else {
      form.tags.forEach((tag, index) => {
        switch (tag.tag) {
          case "azul":
            tag.id = 1;
            colorsIds.push(1);
            break;
          case "vermelho":
            tag.id = 2;
            colorsIds.push(2);
            break;
          case "verde":
            tag.id = 3;
            colorsIds.push(3);
            break;
          case "amarelo":
            tag.id = 4;
            colorsIds.push(4);
            break;
          case "branco":
            tag.id = 5;
            colorsIds.push(5);
            break;
          default:
            tag.id = 5;
            colorsIds.push(5);
            break;
        }
      });
    }

    switch (path) {
      case "tarefas_isoladas":
        await axios
          .put(`http://localhost:3001/isolated-tasks/${editTask.editTask.id}`, {
            token: getCookie("pwgs22Token"),
            tarefa: form.tarefa,
            tempo_limite: form.tempo_limite,

            status: form.status,
            tags: colorsIds,
          })
          .then(() => {
            console.log("Tarefa editada com sucesso");
            handleCloseModal();
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
        break;
      case "tarefas_listas":
        await axios
          .put(`http://localhost:3001/list-tasks`, {
            token: getCookie("pwgs22Token"),
            id: editTask.editTask.id,
            tarefa: form.tarefa,
            tempo_limite: form.tempo_limite,
            status: form.status,
            tags: colorsIds,
          })
          .then(() => {
            console.log("Tarefa editada com sucesso");
            handleCloseModal();
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
        break;
      default:
        break;
    }

    //   update(ref(db), updates)
    //     .then(() => {
    //       handleCloseModal();
    //     })
    //     .catch(() => {
    //       console.log("erro");
    //     });
    // }
  };

  // const getPath = () => {
  //   switch (path) {
  //     case "tarefas_isoladas":
  //       return editTask.editTask.tarefa;

  //     case "tarefas_listas":
  //       return editTask.editTask.tarefa;
  //     default:
  //       return "";
  //   }
  // };

  const getColorBtn = (color) => {
    switch (color) {
      case "branco":
        return "btn btn-outline-dark";
      case "azul":
        return "btn btn-outline-primary";
      case "verde":
        return "btn btn-outline-success";
      case "amarelo":
        return "btn btn-outline-warning";
      case "vermelho":
        return "btn btn-outline-danger";
    }
  };
  return (
    <div>
      {editTask && (
        <div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Tarefa</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tarefa</Form.Label>
                  <Form.Control
                    defaultValue={editTask.editTask.tarefa}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        tarefa: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Tempo limite</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={editTask.editTask.tempo_limite}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        tempo_limite: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Tags :{" "}
                    {form.tags.map((tag, index) => (
                      <Form.Label
                        key={index}
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        <button
                          type="button"
                          className={getColorBtn(tag.tag)}
                          onClick={() => {
                            const tagsArray = form.tags;
                            tagsArray.splice(index, 1);
                            setForm({
                              ...form,
                              tags: tagsArray,
                            });
                          }}
                        >
                          {tag.tag}
                        </button>
                      </Form.Label>
                    ))}
                  </Form.Label>

                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      setErrorForm({
                        ...errorForm,
                        errorTags: false,
                      });
                      if (
                        !form.tags.some((tag) => tag.tag === e.target.value)
                      ) {
                        setForm({
                          ...form,
                          tags: [
                            ...form.tags,
                            {
                              tag: e.target.value,
                              id: {
                                1: "azul",
                                2: "verde",
                                3: "amarelo",
                                4: "vermelho",
                                5: "branco",
                              },
                            },
                          ],
                        });
                      }
                    }}
                  >
                    <option>-</option>
                    <option>azul</option>
                    <option>vermelho</option>
                    <option>verde</option>
                    <option>amarelo</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    defaultValue={editTask.editTask.status}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        status: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                {errorForm.errorTags && (
                  <div className="alert alert-danger" role="alert">
                    Selecione pelo menos uma tag
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCloseModal();
                  }}
                >
                  Close
                </Button>
                <Button type="submit">Save </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      )}
    </div>
  );
}

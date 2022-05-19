import { useEffect } from "react";
import Link from "next/link";
import useAuth from "../../../hook/auth";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const { createUser, user, loading, error } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/isolated-tasks";
    }
  });

  const onSubmit = (e, data) => {
    createUser(e.target[0].value, e.target[1].value, e.target[2].value);
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={onSubmit}>
          <div className="mb-3 input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nome Completo"
              required
            />
          </div>
          <div className="mb-3 input-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Senha"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className={styles.button}>
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </form>
        <div className={styles.link}>
          <Link href="/">Voltar</Link>
        </div>
      </div>
    </div>
  );
}

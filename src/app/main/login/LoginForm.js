import Link from "next/link";
import { useEffect } from "react";
import useAuth from "../../../hook/auth";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const { loginWithEmailAndPassword, user, loading, error } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      window.location.href = "/isolated-tasks";
    }
  });

  const onSubmit = (e, data) => {
    loginWithEmailAndPassword(e.target[0].value, e.target[1].value);
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={onSubmit}>
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
              Login
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

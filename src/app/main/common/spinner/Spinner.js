import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

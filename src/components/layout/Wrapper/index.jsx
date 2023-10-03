import styles from "./styles.module.css";
export const Wrapper = ({ children }) => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.errorMsg}>
      <h1>UPS!</h1>
      <p>WRONG URL</p>
    </div>
  );
};

export default ErrorPage;

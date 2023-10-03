import { React } from "react";
import { Link } from "react-router-dom";

import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <Link to={`/countries`}>
        <div className={styles.innerContainer}>
          <h2>EXPLORE THE WORLD 🔍</h2>
          {/* <h1 className={styles.title}>COUNTRIES</h1> */}
          <h3>Discover new countries and plan activities around the globe!</h3>
        </div>
        {/* <button>GO TO countries</button> */}
      </Link>
    </div>
  );
};

export default Landing;

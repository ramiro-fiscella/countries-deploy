// import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./CountryCard.module.css";

const CountryCard = (props) => {
  return (
    <Link to={`${props.id}`}>
      <div className={styles.card}>
        <img
          className={styles.flag}
          src={props.flag}
          alt={`Flag of ${props.name}`}
        />
        <div className={styles.cardInfo}>
          <h1>
            {props.name}
            <span>{props.id}</span>
          </h1>
          <p>
            <span>Continent: </span>
            {props.continent}
          </p>
          <p>
            <span>Population: </span> {props.population}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;

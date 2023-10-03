import CountryCard from "../CountryCard/CountryCard";
import styles from "./CardContainer.module.css";

const CardContainer = ({ countries }) => {
  return (
    <div>
      <div className={styles.mainContainer}>
        {countries.map((country) => (
          <CountryCard
            key={country.id}
            id={country.id}
            name={country.name}
            flag={country.flag}
            continent={country.continent}
            population={country.population}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;

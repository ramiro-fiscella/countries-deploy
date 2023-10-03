import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSearchQuery } from "../../redux/actions/actions";
import { SearchBar } from "../index";

import styles from "./NavBar.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchQuery = useSelector((state) => state.searchQuery);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  return (
    <nav>
      <div className={styles.navigation}>
        <div className={styles.logo}>
          <Link to="/countries">
            <button
              className={
                location.pathname === "/countries" ? styles.activeButton : ""
              }
            >
              Countries
            </button>
          </Link>
        </div>

        {location.pathname === "/countries" && (
          <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
        )}

        <ul className={styles.menu}>
          <li>
            <Link to="/activities">
              <button
                className={
                  location.pathname === "/activities" ? styles.activeButton : ""
                }
              >
                Activities
              </button>
            </Link>
          </li>
          {/* <li>
            <Link to="/about">
              <button>About</button>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

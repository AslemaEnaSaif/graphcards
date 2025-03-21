import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";

export default function NavBar() {
  const location = useLocation().pathname;
  return (
    <div className={`${styles.navBar} ${styles.centeredChildContainer}`}>
      <div>
        <Link to="/" className={styles.logo}>
          <div> GraphCards </div>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link
          to="/graphdecks"
          className={`${styles.link} ${
            location.includes("/graphdecks") && styles.active
          }`}
        >
          <span key={"deck"}> GraphDeck </span>
        </Link>
        <Link
          to="/playground"
          className={`${styles.link} ${
            location === "/playground" && styles.active
          }`}
        >
          <span key={"playground"}> Playground </span>
        </Link>
      </div>
    </div>
  );
}

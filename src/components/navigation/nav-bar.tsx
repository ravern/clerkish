import { ClerkieIcon } from "../icons/clerkie-icon";
import FriendsIcon from "../icons/friends-icon";
import HomeIcon from "../icons/home-icon";
import styles from "./nav-bar.module.css";
import { NavBarLink } from "./nav-bar-link";

export function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brandContainer}>
        <ClerkieIcon />
        <span className={styles.brand}>Clerkie Challenge</span>
      </div>
      <div className={styles.linksContainer}>
        <NavBarLink icon={<HomeIcon />} label="Home" href="/" />
        <NavBarLink icon={<FriendsIcon />} label="Friends" href="/friends" />
      </div>
    </nav>
  );
}

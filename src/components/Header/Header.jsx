import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { logoutUser, userObserver } from "../../firebase/config";
import { useDispatch } from "react-redux";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HiddenLink";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Monitor currently sign in user
  useEffect(() => {
    userObserver(displayName, setDisplayName, dispatch);
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              <h2>
                {"<h>"} <span>Shop</span>.
              </h2>
            </Link>
          </div>

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                <div className={styles.logo}>
                  <Link to="/">
                    <h2>
                      {"<h>"} <span>Shop</span>.
                    </h2>
                  </Link>
                </div>
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>

                <ShowOnLogin>
                  <a href="#home" style={{ color: "#CF7808" }}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>

                  <NavLink to="/orderHistory" className={activeLink}>
                    My Orders
                  </NavLink>

                  <NavLink to="/" onClick={() => logoutUser(navigate)}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              <span className={styles.cart}>
                <Link to="/cart">
                  Cart
                  <FaShoppingCart size={20} />
                  <p>0</p>
                </Link>
              </span>
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            <span className={styles.cart}>
              <Link to="/cart">
                Cart
                <FaShoppingCart size={20} />
                <p>0</p>
              </Link>
            </span>

            <HiMenu size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

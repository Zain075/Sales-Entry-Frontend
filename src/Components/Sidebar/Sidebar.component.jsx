import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sidebar.module.css";
import { AiOutlineDashboard, AiOutlineMail } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <AiOutlineDashboard className={styles.icon} />
          Dashboard
        </NavLink>
        <NavLink
          to="/sales-entry"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <AiOutlineMail className={styles.icon} />
          Sales Entry
        </NavLink>
        <NavLink
          to="/sales-list"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FiSend className={styles.icon} />
          Sales List
        </NavLink>
        <NavLink
          to="/sales-receipt"  // Correct spelling
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.active : ""}`
          }
        >
          <FiFileText className={styles.icon} />
          Sales Receipt
        </NavLink>

      </nav>
      {/* <button className={styles.logout}>Logout</button> */}
    </div>
  );
};

export default Sidebar;

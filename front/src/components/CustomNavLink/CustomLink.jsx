import {NavLink} from "react-router-dom";
import styles from "../CustomNavLink/CustomLink.module.css";
import React from "react";

export const CustomNavLink = ({link, text}) =>
    <li>
    <NavLink
        to={link}
        className={({isActive}) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
        }
    >
        {text}
    </NavLink>
</li>
import React from 'react';
// import menu_icon from './menu.png';
import profile_image from './man.png'
import styles from './topnav.module.css'
import { useNavigate } from "react-router-dom";


export default function TopNav () {
    const history = useNavigate();
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_id');

    function logoutHandler() {
        localStorage.removeItem('session_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        localStorage.removeItem('ipv4');
        history("/login")
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <img src={profile_image} alt="" className={styles.profile} />
                <section className={styles.details}>
                    <p>{name}</p>
                    <p>{email}</p>
                </section>
            </div>
            {/* <img src={menu_icon} alt="" className={styles.dropdown} /> */}
            <button onClick={logoutHandler} className={styles.logoutBtn}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </nav>
    )
}
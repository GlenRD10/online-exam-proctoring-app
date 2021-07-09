import React from 'react';
import menu_icon from './menu.png';
import profile_image from './man.png'
import styles from './topnav.module.css'


export default function TopNav () {
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_id');
    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <img src={profile_image} alt="" className={styles.profile} />
                <section className={styles.details}>
                    <p>{name}</p>
                    <p>{email}</p>
                </section>
            </div>
            <img src={menu_icon} alt="" className={styles.dropdown} />
        </nav>
    )
}
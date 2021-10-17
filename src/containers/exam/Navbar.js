import React from 'react';
import styles from './navbar.module.css';

export default function Nabvar(props) {
    console.log(props.allowMultiLang)
    let reminderStyle = {};
    if (props.reminderStatus) {
        reminderStyle = { color: 'brown', fontWeight: 'bold' };
    }

    return (
        <nav className={styles.navbar}>
            <section className={styles.details}>
                <p>Test Name:</p>
                <p>{props.title}</p>
            </section>
            <section className={styles.clock}>
                <i className="fas fa-user-clock"></i>
                <p style={reminderStyle}>{props.timer}</p>
            </section>
        </nav>
    )
}
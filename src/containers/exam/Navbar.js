import React from 'react';
import styles from './navbar.module.css';

export default function Nabvar () {
    return (
        <nav className={styles.navbar}>
            <section className={styles.details}>
                <p>Test Name:</p>
                <p>Exam name goes here</p>
            </section>
            <section className={styles.language}>
                <p>Language:</p>
                <span>
                    <label htmlFor="lang1">Lang1</label>
                    <input type="radio" name="lang" id="lang1" checked style={{marginRight: '12px'}} />
                    <label htmlFor="lang2">Lang2</label>
                    <input type="radio" name="lang" id="lang2" />
                </span>
            </section>
            <section className={styles.clock}>
                <i className="fas fa-user-clock"></i>
                <p>00:59:46</p>
            </section>
        </nav>
    )
}
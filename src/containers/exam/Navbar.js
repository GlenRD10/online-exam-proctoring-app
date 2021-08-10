import React from 'react';
import styles from './navbar.module.css';

export default function Nabvar (props) {
    function radioHandler(event) {
        console.log(event.target.id);
        props.setLanguage(event.target.id);
    }

    return (
        <nav className={styles.navbar}>
            <section className={styles.details}>
                <p>Test Name:</p>
                <p>SECOND SEMESTER BACHELOR OF ARTS (B.A.) (CBCS PATTERN)</p>
            </section>
            <section className={styles.language}>
                <p>Language:</p>
                <span onChange={radioHandler} >
                    {/* <label htmlFor="lang1">Lang1</label>
                    <input type="radio" name="lang" id="lang1" checked style={{marginRight: '12px'}} /> */}
                    <label htmlFor="lang-1"><input type="radio" name="lang" id="lang-1"/>Lang-1</label>
                    {/* <label htmlFor="lang2">Lang2</label>
                    <input type="radio" name="lang" id="lang2" /> */}
                    <label htmlFor="lang-2"><input type="radio" name="lang" id="lang-2"/>Lang-2</label>
                </span>
            </section>
            <section className={styles.clock}>
                <i className="fas fa-user-clock"></i>
                <p>{props.timer}</p>
            </section>
        </nav>
    )
}
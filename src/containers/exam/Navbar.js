import React from 'react';
import styles from './navbar.module.css';

export default function Nabvar (props) {
    let reminderStyle = {};
    if(props.reminderStatus) {
        reminderStyle = {color: 'brown', fontWeight: 'bold'};
    }

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
                <p>Language: {props.allowMultiLang ? '' : props.primaryLang}</p>
                {props.allowMultiLang && <span onChange={radioHandler} >
                    {/* <label htmlFor="lang1">Lang1</label>
                    <input type="radio" name="lang" id="lang1" checked style={{marginRight: '12px'}} /> */}
                    <label htmlFor={props.primaryLang}><input type="radio" name="lang" id={props.primaryLang}/>{props.primaryLang}</label>
                    {/* <label htmlFor="lang2">Lang2</label>
                    <input type="radio" name="lang" id="lang2" /> */}
                    <label htmlFor={props.secondaryLang}><input type="radio" name="lang" id={props.secondaryLang}/>{props.secondaryLang}</label>
                </span>}
            </section>
            <section className={styles.clock}>
                <i className="fas fa-user-clock"></i>
                <p style={reminderStyle}>{props.timer}</p>
            </section>
        </nav>
    )
}
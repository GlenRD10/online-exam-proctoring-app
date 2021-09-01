import React from 'react';
import styles from './languagebar.module.css';

export default function LanguageBar (props) {

    const btnHandler = () => {
        // if (window.screen.width < 768) {
            console.log(props.sidebarVisibility);
            if (props.sidebarVisibility) props.setsidebarVisibility(false);
            else props.setsidebarVisibility(true);
            console.log(props.sidebarVisibility);
        // }
    }

    return (
        <nav className={styles.langbar}>
            <p>Language: </p>
            <label htmlFor="lang-1"><input type="radio" name="lang" id="lang-1" />Lang 1</label>
            <label htmlFor="lang-2"><input type="radio" name="lang" id="lang-2" />Lang 2</label>
            <button onClick={btnHandler}><i className="fas fa-bars"></i></button>
        </nav>
    )
}
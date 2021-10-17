import React from 'react';
import styles from './languagebar.module.css';

export default function LanguageBar(props) {

    const btnHandler = () => {
        if (props.sidebarVisibility) props.setsidebarVisibility(false);
        else props.setsidebarVisibility(true);
    }

    function radioHandler(event) {
        props.setLanguage(event.target.id);
    }

    return (
        <nav className={styles.langbar}>
            <p>{props.allowMultiLang ? 'Language: ' : ''}</p>
            {props.allowMultiLang && <span onChange={radioHandler}>
                <label htmlFor="lang-1"><input type="radio" name="lang" id={props.primaryLang} />{props.primaryLang}</label>
                <label htmlFor="lang-2"><input type="radio" name="lang" id={props.secondaryLang} />{props.secondaryLang}</label>
            </span>}
            <button onClick={btnHandler}><i className="fas fa-bars"></i></button>
        </nav>
    )
}
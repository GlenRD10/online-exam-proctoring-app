import React from 'react';
import styles from './footer.module.css';

export default function Footer (props) {
    function BtnHandler(e) {
        const value = e.currentTarget.getAttribute("data-value");
        props.setIndexValue(value);
    }

    return (
        <footer className={styles.footer}>
            <button onClick={BtnHandler} data-value="previous" className={styles.previousBtn}><i className="fas fa-angle-double-left"></i>Previous</button>
            <button className={styles.flag}>Review</button>
            <button onClick={BtnHandler} data-value="next" className={styles.nextBtn}>Save and Next<i className="fas fa-angle-double-right"></i></button>
        </footer>
    )
}
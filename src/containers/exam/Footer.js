import React from 'react';
import styles from './footer.module.css';

export default function Footer (props) {
    function BtnHandler(e) {
        const value = e.currentTarget.getAttribute("data-value");
        props.setIndexValue(value);
    }

    function reviewHandler() {
        props.toggleReviewStatus();
    }

    function clearHandler() {
        props.clearOptions();
    }

    return (
        <footer className={styles.footer}>
            {props.allowNavigation && <button onClick={BtnHandler} data-value="previous" className={styles.previousBtn}><i className="fas fa-angle-double-left"></i>Previous</button>}
            <button onClick={clearHandler} className={styles.flag}>Clear</button>
            {props.allowReview && <button className={styles.flag} onClick={reviewHandler}>{props.reviewStatus ? 'Reviewed' : 'Review'}</button>}
            <button onClick={BtnHandler} data-value="next" className={styles.nextBtn}>{(props.index === props.questionList.length - 2) && !props.allowNavigation ? 'Submit the Exam' : 'Save and Next'}<i className="fas fa-angle-double-right"></i></button>
        </footer>
    )
}
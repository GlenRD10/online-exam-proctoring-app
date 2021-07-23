import React from 'react';
import styles from './body.module.css';

export default function Body (props) {

    console.log(props.questionList);

    function radioHandler(event) {
        console.log(event.target.id);
    }
    
    return (
        <div className={styles.body}>
            <section className={styles.question}>
                <h3>Question number {props.index+1}</h3>
                <p>{props.languageChosen === 'lang-1'? props.questionList[props.index][14] : props.questionList[props.index][19]}</p>
            </section>
            <section className={styles.options}>
                <ul onChange={radioHandler}>
                    <li>
                        <label htmlFor="opt1"><input type="radio" name="ans" id="opt1" />{props.languageChosen === 'lang-1'? props.questionList[props.index][15] : props.questionList[props.index][20]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt2"><input type="radio" name="ans" id="opt2" />{props.languageChosen === 'lang-1'? props.questionList[props.index][16] : props.questionList[props.index][21]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt3"><input type="radio" name="ans" id="opt3" />{props.languageChosen === 'lang-1'? props.questionList[props.index][17] : props.questionList[props.index][22]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt4"><input type="radio" name="ans" id="opt4" />{props.languageChosen === 'lang-1'? props.questionList[props.index][18] : props.questionList[props.index][23]}</label>
                    </li>
                </ul>
            </section>
        </div>
    )
}
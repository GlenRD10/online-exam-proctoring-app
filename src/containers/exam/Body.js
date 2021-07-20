import React from 'react';
import styles from './body.module.css';

export default function Body (props) {
    console.log(props.questionList);
    
    return (
        <div className={styles.body}>
            <section className={styles.question}>
                <h3>Question number {props.index+1}</h3>
                <p>{props.questionList[props.index][14]}</p>
            </section>
            <section className={styles.options}>
                <ul>
                    <li>
                        <label htmlFor="opt1"><input type="radio" name="ans" id="opt1" />{props.questionList[props.index][15]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt2"><input type="radio" name="ans" id="opt2" />{props.questionList[props.index][16]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt3"><input type="radio" name="ans" id="opt3" />{props.questionList[props.index][17]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt4"><input type="radio" name="ans" id="opt4" />{props.questionList[props.index][18]}</label>
                    </li>
                </ul>
            </section>
        </div>
    )
}
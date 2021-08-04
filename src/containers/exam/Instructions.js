import React from 'react';
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import styles from './instructions.module.css';

export default function Instructions () {
    // const handle = useFullScreenHandle();

    return (
        <div className={styles.container}>
            <h2>Exam Name Goes Here</h2>
            <section className={styles.instruction}>
                <h1><i>Instructions</i></h1>
                <ol>
                    <li>
                        <p>Instruction 1 goes here</p>
                    </li>
                    <li>
                        <p>Instruction 2 goes here</p>
                    </li>
                    <li>
                        <p>Instruction 3 goes here</p>
                    </li>
                    <li>
                        <p>Instruction 4 goes here</p>
                    </li>
                </ol>
            </section>
            <section className={styles.confirm}>
                <label htmlFor="confirm"><input type="checkbox" name="" id="confirm" />I have read and understood the instructions</label>
                <button>I am ready to begin</button>
            </section>
        </div>
    )
}
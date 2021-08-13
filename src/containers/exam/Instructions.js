import React from 'react';
import axios from 'axios';
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import styles from './instructions.module.css';

export default function Instructions (props) {
    // const handle = useFullScreenHandle();

    let data = {
        exam_session: props.exam_session,
        user_id: props.user_id,
        user_ses_id: props.user_ses_id,
        exam_code: props.exam_code,
        subject_code: props.subject_code,
        exam_id: props.exam_id,
        scheduler_id: props.scheduler_id,
        roll_number: props.roll_number,
        ip: '0.0.0.0'
    }

    const btnHandler = () => {
        startExam();
        
        props.setShowDiv(true);
        props.setShowInstructions(false);
        props.handle.enter();
        props.countDown({hr: 2, min: 0, sec: 0})
   }

   async function startExam() {
        const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/';
        

        data = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        try {
            const res = await axios({
                method: 'post',
                url: url + 'student_exam_start',                           
                crossDomain: true,
                data: data,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            const statusReport = xml.documentElement.firstChild.data
            console.log(statusReport)

        } catch(e) {
            console.log(e.response);
        }

    }

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
                <button onClick={btnHandler}>I am ready to begin</button>
            </section>
        </div>
    )
}
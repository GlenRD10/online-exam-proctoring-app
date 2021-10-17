import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import styles from './instructions.module.css';

export default function Instructions(props) {

    const [showInstructions, setShowInstructions] = useState(false);
    // const handle = useFullScreenHandle();
    const [checkBox, setCheckBox] = useState(false);

    const navigate = useNavigate();

    function checkBoxStatus() {
        if (!checkBox) setCheckBox(true);
        else setCheckBox(false)
        // console.log(checkBox);
    }

    let data = {
        exam_session: props.data.exam_session,
        user_id: props.data.user_id,
        user_ses_id: props.data.user_ses_id,
        exam_code: props.data.exam_code,
        subject_code: props.data.subject_code,
        exam_id: props.data.exam_id,
        scheduler_id: props.data.scheduler_id,
        roll_number: props.data.roll_number,
        ip: localStorage.getItem('ipv4')
    }

    const btnHandler = () => {
        startExam();

        props.setShowDiv(true);
        props.setShowInstructions(false);
        props.handle.enter();
        if (props.seperateTimer) {
            let hr = Math.trunc(props.seperateTimerInSeconds / 3600);
            let min = Math.trunc((props.seperateTimerInSeconds % 3600) / 60);
            let sec = Math.trunc(props.seperateTimerInSeconds % 60)
            props.countDown({ hr, min, sec })
            //Implement the seperate timer
        } else {
            let hr = Math.trunc(props.timeRemaining / 3600);
            let min = Math.trunc((props.timeRemaining % 3600) / 60);
            let sec = Math.trunc(props.timeRemaining % 60)
            props.countDown({ hr, min, sec })
        }
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
            // eslint-disable-next-line no-unused-vars
            const statusReport = xml.querySelector('string').textContent.split('~');
            // console.log(statusReport)

        } catch (e) {
            console.log(e.response);
        }

    }

    let postData = {
        exam_session: props.data.exam_session,
        user_id: props.data.user_id,
        user_ses_id: props.data.user_ses_id,
        exam_code: props.data.exam_code,
        subject_code: props.data.subject_code,
        exam_id: props.data.exam_id,
        scheduler_id: props.data.scheduler_id,
        roll_number: props.data.roll_number,
        ip: localStorage.getItem('ipv4')
    }

    useEffect(() => {
        getInstructions();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function getInstructions() {
        const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/';

        postData = Object.keys(postData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        try {
            const res = await axios({
                method: 'post',
                url: url + 'get_student_exam_schedule_settings_list ',
                crossDomain: true,
                data: postData,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            const backendData = [...xml.querySelectorAll('anyType')].map((ele) => ele.textContent.split('~'));
            props.setSettingsData(backendData);
            setShowInstructions(true);
            console.log(backendData);
            props.setAllowReview(backendData[0][0] === 'y' ? true : false);
            props.setAllowMultiLang(backendData[0][13] === 'y' ? true : false);
            props.setAllowNavigation(backendData[0][10] === 'n' ? false : true);
            props.setPrimaryLang(backendData[0][14]);
            props.setSecondaryLang(backendData[0][15]);
            props.setLanguageChosen(backendData[0][14]);
            props.setReminder(backendData[0][21]);
            if (backendData[0][5] === 'y') {
                props.setSeperateTimer(true);
                props.setSeperateTimerInSeconds(backendData[0][6]);
            }
            // eslint-disable-next-line eqeqeq
            if (backendData[0][9] === 'y') props.setProctoringEnabled(true);
            props.setSendImgTimer(backendData[0][31]);
            // eslint-disable-next-line eqeqeq
            if(parseInt(backendData[0][24]) === 0) props.setSwitchAlert(false);

        } catch (e) {
            console.log(e.response);
        }

    }

    return (
        <div className={styles.container}>
            <h2>Instructions</h2>
            <section className={styles.instruction}>
                {showInstructions && <div dangerouslySetInnerHTML={{ __html: props.settingsData[0][26] }} />}
            </section>
            <section className={styles.confirm}>
                <label htmlFor="confirm"><input type="checkbox" onChange={checkBoxStatus} name="" id="confirm" />I have read and understood the instructions</label>
                <section className={styles.btns}>
                    <button onClick={() => navigate('/dashboard', { state: { session_id: localStorage.getItem('session_id'), user_id: localStorage.getItem('user_id') } })}>Cancel</button>
                    {checkBox && <button onClick={btnHandler}>Begin</button>}
                </section>
            </section>
        </div>
    )
}
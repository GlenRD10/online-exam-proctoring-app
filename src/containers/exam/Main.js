import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body';
import Sidebar from './Sidebar';
import Instructions from './Instructions';
import styles from './main.module.css'
import { useEffect , useState} from 'react';
import { useLocation } from 'react-router';
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import axios from 'axios';

export default function Main () {
    const [index, setIndex] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [languageChosen, setLanguageChosen] = useState('lang-1');
    const [timer, setTimer] = useState('02:00:00')
    const [showNav, setShowNav] = useState(false);
    const [showBody, setShowBody] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const [showDiv, setShowDiv] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    const [answerValue, setAnswerValue] = useState('');
    const [reviewStatus, setReviewStatus] = useState(false);
    const [buttonColors, setButtonColors] = useState([]);

    function updateAnswerValue(value) {
        setAnswerValue(value)
    }

    const location = useLocation();
    useEffect(() => {
        SendPostRequest();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const exam_code = location.state.examData[0];
    const subject_code = location.state.examData[2];
    const exam_id = location.state.examData[4];
    const scheduler_id = location.state.examData[5];
    const roll_number = location.state.examData[6];

    let data = {
        exam_session: 'SUMMER-2021',
        user_id: location.state.user_id,
        user_ses_id: location.state.session_id,
        exam_code: exam_code,
        subject_code: subject_code,
        exam_id: exam_id,
        scheduler_id: scheduler_id,
        roll_number: roll_number,
    }

    async function SendPostRequest() {
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
                url: url + 'get_student_exam_schedule_questions_list',                           
                crossDomain: true,
                data: data,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            console.log(xml);
            const questionData = [...xml.querySelectorAll('anyType')].map((ele) => ele.textContent.split('~'));
            console.log(questionData);
            
            let btnColors = [];

            for (let i=0; i<questionData.length-1; i++) {


                let data = {
                    exam_session: 'SUMMER-2021',
                    user_id: localStorage.getItem('user_id'),
                    user_ses_id: localStorage.getItem('session_id'),
                    exam_code: exam_code,
                    subject_code: subject_code,
                    exam_id: exam_id,
                    scheduler_id: scheduler_id,
                    roll_number: roll_number,
                    question_id: questionData[i][0],
                    ip: '0.0.0.0'
                }

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
                        url: url + 'student_exam_question_answer_read',                           
                        crossDomain: true,
                        data: data,
                        headers
                    });
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(res.data, 'text/xml');
                    const questionAttemptData = xml.documentElement.firstChild.data

                    if(questionAttemptData[0] === '~') {
                        if(questionAttemptData[1] === 'y') {
                            btnColors.push('brown');
                        }
                        else {
                            btnColors.push('#9ad1d4');
                        }
                    } else {
                        if(questionAttemptData[2] === 'y') {
                            btnColors.push('orange');
                        } else {
                            btnColors.push('green');
                        }
                    }
                    

                } catch(e) {
                    console.log(e.response);
                }

            }
            setButtonColors(btnColors);
            console.log(buttonColors);

            setQuestionList(questionData);
            setShowNav(true);
            setShowBody(true);
            setShowFooter(true);
            setShowSidebar(true);
            
        } catch(e) {
            console.log(e.response);
        }

    }

    function setFooterFun(value) {
        setShowFooter(value);
    }

    let answerData = {
        exam_session: 'SUMMER-2021',
        user_id: location.state.user_id,
        user_ses_id: location.state.session_id,
        exam_code: exam_code,
        subject_code: subject_code,
        exam_id: exam_id,
        scheduler_id: scheduler_id,
        roll_number: roll_number,
        question_id: questionList[index] && questionList[index][0],
        elapsed_time_seconds: index+2,
        answer_attempt: answerValue,
        question_reviewed: reviewStatus ? 'y' : 'n',
        ip: '0.0.0.0'
    }

    async function saveAnswer() {
        const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/';
        

        answerData = Object.keys(answerData).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(answerData[key]);
        }).join('&');
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        try {
            const res = await axios({
                method: 'post',
                url: url + 'student_exam_question_answer_save',                           
                crossDomain: true,
                data: answerData,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            const questionAttemptData = xml.documentElement.firstChild.data
            console.log(questionAttemptData[0])

        } catch(e) {
            console.log(e.response);
        }

    }

    function setIndexValue(value) {
        if(index !== 0 && value === 'previous') {
            setIndex(index-1);
        }
        else if(index === 0 && value === 'previous') {
            setIndex(questionList.length-2);
        }
        else if(index !== questionList.length-2 && value === 'next') {
            setIndex(index+1);
        }
        else if(index === questionList.length-2 && value === 'next') {
            setIndex(0);
        }
        else {
            setIndex(value);
        }
        saveAnswer();
    }

    function setLanguage(value) {
        setLanguageChosen(value);
    }

    function toggleReviewStatus() {
        reviewStatus ? setReviewStatus(false) : setReviewStatus(true);
    }
    function setReviewStatusFun(value) {
        setReviewStatus(value);
    }

    function clearOptions() {
        setAnswerValue('');
    }

    const handle = useFullScreenHandle();

    useEffect(() => {
        window.addEventListener('fullscreenchange', (event) => {
            let alerted = false
            if (!document.webkitIsFullScreen && !alerted) {
                alert('You cannot do that!');
                alerted = true;
            }
        })
    }, [] );

    const countDown = (remTime) => {
        let interval = setInterval(() => {
            if (remTime.hr === 0 && remTime.min === 0 && remTime.sec === 0) {
                clearInterval(interval);
                // exam end code goes here
            } else {
                if (remTime.sec > 0) remTime.sec -= 1;
                else {
                    remTime.sec = 59;
                    if (remTime.min > 0) remTime.min -= 1;
                    else {
                        remTime.min = 59;
                        remTime.hr -= 1;
                    }
                }

                var hr = "", min = "", sec = "";
                if (remTime.hr > 9) hr = String(remTime.hr);
                else hr = "0" + String(remTime.hr);
                if (remTime.min > 9) min = String(remTime.min);
                else min = "0" + String(remTime.min);
                if (remTime.sec > 9) sec = String(remTime.sec);
                else sec = "0" + String(remTime.sec);
                setTimer(hr + ":" + min + ":" + sec);
            }
        }, 1000)
    }

    // useEffect(() => {
    //     countDown({hr: 2, min: 0, sec: 0});
    // }, []);

    return (
        <div>
            {showInstructions && <Instructions setShowDiv={setShowDiv} setShowInstructions={setShowInstructions} handle={handle} countDown={countDown} />}
            <FullScreen handle={handle}>
                {showDiv && <div>
                    {showNav && <Navbar languageChosen={languageChosen} setLanguage={setLanguage} timer={timer} />}
                    <div className={styles.main}>
                        <div className={styles.bodyAndFooter}>
                        {showBody && <Body setFooterFun={setFooterFun} setReviewStatusFun={setReviewStatusFun} answerValue={answerValue} updateAnswerValue={updateAnswerValue} questionList={questionList} index={index} languageChosen={languageChosen} exam_code={data.exam_code} subject_code={data.subject_code} exam_id={data.exam_id} scheduler_id={data.scheduler_id} roll_number={data.roll_number}/>}
                            {showFooter && <Footer clearOptions={clearOptions} reviewStatus={reviewStatus} setIndexValue={setIndexValue} toggleReviewStatus={toggleReviewStatus}/>}
                        </div>
                        <div className={styles.sidebar}>
                            {showSidebar && <Sidebar buttonColors={buttonColors} setIndexValue={setIndexValue} questionList={questionList}/>}
                        </div>
                    </div>
                </div>}
            </FullScreen>
        </div>
    )
}
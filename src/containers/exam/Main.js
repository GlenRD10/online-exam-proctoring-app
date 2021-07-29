import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body';
import Sidebar from './Sidebar';
// import Instructions from './Instructions';
import styles from './main.module.css'
import { useEffect , useState} from 'react';
import { useLocation } from 'react-router';
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import axios from 'axios';

export default function Main () {
    const [index, setIndex] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [languageChosen, setLanguageChosen] = useState('lang-1');
    const [showNav, setShowNav] = useState(false);
    const [showBody, setShowBody] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const [answerValue, setAnswerValue] = useState('');

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
            setQuestionList(questionData);
            setShowNav(true);
            setShowBody(true);
            setShowFooter(true);
            setShowSidebar(true);
            
        } catch(e) {
            console.log(e.response);
        }

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
        question_reviewed: 'n',
        ip: '0.0.0.0'
    }

    console.log(answerData);

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

    const handle = useFullScreenHandle();

    useEffect(() => {
        window.addEventListener('fullscreenchange', (event) => {
            let alerted = false
            if (!document.webkitIsFullScreen && !alerted) {
                alert('You cannot do that!');
                alerted = true;
            }
        })
    })

    return (
        <div>
            {/* <Instructions/> */}
            <FullScreen handle={handle}>
                <div>
                    {showNav && <Navbar languageChosen={languageChosen} setLanguage={setLanguage}/>}
                    <div className={styles.main}>
                        <div className={styles.bodyAndFooter}>
                        {showBody && <Body answerValue={answerValue} updateAnswerValue={updateAnswerValue} questionList={questionList} index={index} languageChosen={languageChosen} exam_code={data.exam_code} subject_code={data.subject_code} exam_id={data.exam_id} scheduler_id={data.scheduler_id} roll_number={data.roll_number}/>}
                            {showFooter && <Footer setIndexValue={setIndexValue}/>}
                        </div>
                        <div className={styles.sidebar}>
                            {showSidebar && <Sidebar setIndexValue={setIndexValue} questionList={questionList}/>}
                        </div>
                    </div>
                </div>
            </FullScreen>
        </div>
    )
}
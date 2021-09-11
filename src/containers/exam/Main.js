import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body';
import Sidebar from './Sidebar';
import Instructions from './Instructions';
import LanguageBar from './LanguageBar';
import styles from './main.module.css'
import { useEffect , useState} from 'react';
import { useLocation } from 'react-router';
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import axios from 'axios';
import Modal from "../modal/modal";
import ImageModal from "../modal/image_modal";

export default function Main () {
    let img1;
    const [showImage, setShowImage] = useState(false);
    const [show, setShow] = useState(false);

    const location = useLocation();
    const time_remaining = location.state.examData[12];

    let hr = Math.trunc(time_remaining / 3600);
    let min = Math.trunc((time_remaining % 3600) / 60);
    let sec = Math.trunc(time_remaining % 60)

    if (hr > 9) hr = String(hr);
    else hr = "0" + String(hr);
    if (min > 9) min = String(min);
    else min = "0" + String(min);
    if (sec > 9) sec = String(sec);
    else sec = "0" + String(sec);

    const [index, setIndex] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    
    const [timer, setTimer] = useState(hr + ':' + min + ':' + sec);
    const [questionTimer, setQuestionTimer] = useState(0);
    const [showNav, setShowNav] = useState(false);
    const [showBody, setShowBody] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const [showDiv, setShowDiv] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);

    const [answerValue, setAnswerValue] = useState('');
    const [reviewStatus, setReviewStatus] = useState(false);
    const [buttonColors, setButtonColors] = useState([]);
    const [legendCtn, setLegendCtn] = useState([]);

    //Settings Parameters 
    const[allowMultiLang, setAllowMultiLang] = useState(false);
    const[primaryLang, setPrimaryLang] = useState('');
    const[secondaryLang, setSecondaryLang] = useState('');
    const [languageChosen, setLanguageChosen] = useState(primaryLang !== '' ? primaryLang : '');
    const [allowReview, setAllowReview] = useState(false);

    const [sidebarVisibility, setsidebarVisibility] = useState(false);
    const [seperateTimer, setSeperateTimer] = useState(false);
    const [seperateTimerInSeconds, setSeperateTimerInSeconds] = useState(0);
    // console.log(seperateTimer + seperateTimerInSeconds);

    const [allowNavigation, setAllowNavigation] = useState(true);
    const [reminder, setReminder] = useState(0);
    const [reminderStatus, setReminderStatus] = useState(false);

    // if (window.screen.width < 768) {
    //     setsidebarVisibility({ display: 'none' })
    // }

    function updateAnswerValue(value) {
        setAnswerValue(value)
    }

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
            let legendCount = [0,0,0,0];

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
                    ip: localStorage.getItem('ipv4')
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
                            legendCount[3] += 1;
                        }
                        else {
                            btnColors.push('#9ad1d4');
                            legendCount[1] += 1;
                        }
                    } else {
                        if(questionAttemptData[2] === 'y') {
                            btnColors.push('orange');
                            legendCount[2] += 1;
                        } else {
                            btnColors.push('green');
                            legendCount[0] += 1;
                        }
                    }
                    

                } catch(e) {
                    console.log(e.response);
                }

            }
            setButtonColors(btnColors);
            setLegendCtn(legendCount);

            setQuestionList(questionData);
            setShowNav(true);
            setShowBody(true);
            setShowFooter(true);
            setShowSidebar(true);
            img1 = Buffer.from(questionList[index][24], "base64").toString();
            
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
        elapsed_time_seconds: 5,
        answer_attempt: answerValue,
        question_reviewed: reviewStatus ? 'y' : 'n',
        ip: localStorage.getItem('ipv4')
    }

    async function saveAnswer() {
        answerData.elapsed_time_seconds = questionTimer;

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
        let tempArray = buttonColors;
        let tempcount = [0,0,0,0];

        if(reviewStatus && answerValue !== '') {
            //Update array for color yellow
            tempArray[index] = 'orange'
        } else if(reviewStatus && answerValue === '') {
            //Update array for color red
            tempArray[index] = 'brown'
        } else if(!reviewStatus && answerValue !== '') {
            //Update array for color green
            tempArray[index] = 'green'
        } else {
            //Update array for blue
            tempArray[index] = '#9ad1d4'
        }

        tempArray.forEach((v,i) => {
            if(v === 'green') tempcount[0] += 1;
            else if(v === 'orange') tempcount[2] += 1;
            else if(v === 'brown') tempcount[3] += 1;
            else tempcount[1] += 1;
        });

        setLegendCtn(tempcount);

        if(index !== 0 && value === 'previous') {
            setIndex(index-1);
        }
        else if(index === 0 && value === 'previous') {
            setIndex(questionList.length-2);
        }
        else if(index !== questionList.length-2 && value === 'next') {
            setIndex(index+1);
        }
        else if(index === questionList.length-2 && value === 'next' && !allowNavigation) {
            console.log("End of Exam");
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
            if(remTime.min < reminder && remTime.hr === 0) {
                setReminderStatus(true);
            }
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
    

    return (
        <div>
            {showInstructions && <Instructions setReminder={setReminder} setAllowNavigation={setAllowNavigation} setSeperateTimer={setSeperateTimer} setSeperateTimerInSeconds={setSeperateTimerInSeconds} setLanguageChosen={setLanguageChosen} setPrimaryLang={setPrimaryLang} setSecondaryLang={setSecondaryLang} setAllowMultiLang={setAllowMultiLang} setAllowReview={setAllowReview} data={data} setShowDiv={setShowDiv} setShowInstructions={setShowInstructions} handle={handle} countDown={countDown} timeRemaining={time_remaining} />}
            
            <FullScreen handle={handle}>
                {showDiv && <div>
                    <ImageModal title="Exam Summary" onClose={() => setShowImage(false)} showImage={showImage}>
                        <img src={"data:image/jpeg;base64," + img1 } style={{display: 'block'}} alt=""/>
                    </ImageModal>
                    <Modal title="Exam Summary" onClose={() => setShow(false)} show={show}>
                        <ul>
                            <li><span style={{backgroundColor: 'green'}}>{legendCtn[0]}</span> Attempted</li>
                            <li><span style={{backgroundColor: '#9ad1d4'}}>{legendCtn[1]}</span> Not Attempted</li>
                            {allowReview && <li><span style={{backgroundColor: 'orange'}}>{legendCtn[2]}</span> Attempted and Review</li>}
                            {allowReview && <li><span style={{backgroundColor: 'brown'}}>{legendCtn[3]}</span> Not Attempted and Review</li>}
                        </ul>
                    </Modal>
                    {showNav && <Navbar reminderStatus={reminderStatus} allowMultiLang={allowMultiLang} primaryLang={primaryLang} secondaryLang={secondaryLang} languageChosen={languageChosen} setLanguage={setLanguage} timer={timer} />}
                    <LanguageBar sidebarVisibility={sidebarVisibility} setsidebarVisibility={setsidebarVisibility} allowMultiLang={allowMultiLang} primaryLang={primaryLang} secondaryLang={secondaryLang} languageChosen={languageChosen} setLanguage={setLanguage}/>
                    <div className={styles.main}>
                        <div className={styles.bodyAndFooter}>
                        {showBody && <Body setShowImage={setShowImage} questionTimer={questionTimer} setQuestionTimer={setQuestionTimer} primaryLang={primaryLang} setFooterFun={setFooterFun} setReviewStatusFun={setReviewStatusFun} answerValue={answerValue} updateAnswerValue={updateAnswerValue} questionList={questionList} index={index} languageChosen={languageChosen} exam_code={data.exam_code} subject_code={data.subject_code} exam_id={data.exam_id} scheduler_id={data.scheduler_id} roll_number={data.roll_number}/>}
                            {showFooter && <Footer setShow={setShow} index={index} questionList={questionList} allowNavigation={allowNavigation} clearOptions={clearOptions} allowReview={allowReview} reviewStatus={reviewStatus} setIndexValue={setIndexValue} toggleReviewStatus={toggleReviewStatus}/>}
                        </div>
                        <div className={`${styles.sidebar} ${sidebarVisibility ? styles.showSidebar : styles.notShowSidebar}`}>
                            {showSidebar && <Sidebar allowNavigation={allowNavigation} allowReview={allowReview} legendCtn={legendCtn} buttonColors={buttonColors} setIndexValue={setIndexValue} questionList={questionList}/>}
                        </div>
                    </div>

                </div>}
            </FullScreen>
        </div>
    )
}
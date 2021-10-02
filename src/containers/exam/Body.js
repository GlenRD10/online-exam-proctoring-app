import React, {useState, useEffect} from 'react';
import styles from './body.module.css';
import axios from 'axios';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
// import { Dialog, DialogContent, DialogContentText, Button, DialogActions, DialogTitle } from '@material-ui/core';

Modal.setAppElement("#root");

const ImageDialog = (props) => {
    return (
        <div className={styles.dialog}>
            <img src={"data:image/jpeg;base64," + props.img } style={{display: 'block'}} alt="" />
            <button onClick={() => props.setShowImageDialog(false)}>Close</button>
        </div>
    )
}



const SubmitDialog = (props) => {
    const navigate = useNavigate();
    function endExamFnc() {
        props.endTheExam();
        navigate('/dashboard', { state: {session_id: localStorage.getItem('session_id'), user_id: localStorage.getItem('user_id')} });
        alert('You have Submitted your exam!');
    }

    return (
        <div style={{width: '50%', left: '25%'}} className={styles.dialog}>
            <h4 style={{textAlign: 'center', fontSize: '25px'}}>Exam Summary</h4>
            <ul className={styles.legend}>
                <li><span style={{backgroundColor: 'green'}}>{props.legendCtn[0]}</span> Attempted</li>
                <li><span style={{backgroundColor: '#9ad1d4'}}>{props.legendCtn[1]}</span> Not Attempted</li>
                {props.allowReview && <li><span style={{backgroundColor: 'orange'}}>{props.legendCtn[2]}</span> Attempted and Review</li>}
                {props.allowReview && <li><span style={{backgroundColor: 'brown'}}>{props.legendCtn[3]}</span> Not Attempted and Review</li>}
            </ul>
            <button onClick={endExamFnc}>Submit</button>
            <button onClick={() => props.setShowSubmitDialog(false)}>Close</button>
        </div>
        
    )
}

export default function Body (props) {

    const [isActive, setIsActive] = useState(false);

    // const [answerValue, setAnswerValue] = useState('');
    const [showQuestions, setShowQuestions] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);

    // console.log(props.index)

    let data = {
        exam_session: 'SUMMER-2021',
        user_id: localStorage.getItem('user_id'),
        user_ses_id: localStorage.getItem('session_id'),
        exam_code: props.exam_code,
        subject_code: props.subject_code,
        exam_id: props.exam_id,
        scheduler_id: props.scheduler_id,
        roll_number: props.roll_number,
        question_id: props.questionList[props.index] && props.questionList[props.index][0],
        ip: localStorage.getItem('ipv4'),
    }

    useEffect(() => {
        let interval = null;
        // eslint-disable-next-line eqeqeq
        if(props.seperateTimer && props.seperateTimerInSeconds == props.questionTimer) {
            let hr = Math.trunc(props.seperateTimerInSeconds / 3600);
            let min = Math.trunc((props.seperateTimerInSeconds % 3600) / 60);
            let sec = Math.trunc(props.seperateTimerInSeconds % 60)
            props.countDown({hr, min, sec});
            props.setIndexValue('next');
        }
        if (isActive) {
          interval = setInterval(() => {
            props.setQuestionTimer(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && props.questionTimer !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isActive, props.questionTimer]);

    useEffect(() => {
        // console.log(props.questionTimer);
        props.setQuestionTimer(0);
        setIsActive(false);

        setIsActive(true);

        props.setFooterFun(false);
        setShowQuestions(false);
        setShowOptions(false);
        SendPostRequest();
    }, [props.index]); // eslint-disable-line react-hooks/exhaustive-deps

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
                url: url + 'student_exam_question_answer_read',                           
                crossDomain: true,
                data: data,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            const questionAttemptData = xml.documentElement.firstChild.data
            // console.log(questionAttemptData)
            if(questionAttemptData[0] === '~') {
                if(questionAttemptData[1] === 'y') {
                    props.setReviewStatusFun(true);
                }
                else {
                    props.setReviewStatusFun(false);
                }
                props.updateAnswerValue('');
            } else {
                if(questionAttemptData[2] === 'y') {
                    props.setReviewStatusFun(true);
                }
                else {
                    props.setReviewStatusFun(false);
                }
                props.updateAnswerValue(questionAttemptData[0]);
            }
            setShowOptions(true);
            setShowQuestions(true);
            props.setFooterFun(true);

        } catch(e) {
            console.log(e.response);
        }

    }

    function radioHandler(event) {
        props.updateAnswerValue(event.target.id)
    }

    // function btnHandler() {
    //     if (window.screen.width <= 768) {
    //         if (props.sidebarVisibility.display === '' || props.sidebarVisibility.display === 'none') props.setsidebarVisibility({ display: 'block' })
    //         else props.setsidebarVisibility({ display: 'none' })
    //     }
    // }

    let img1 = Buffer.from(props.questionList[props.index][24], "base64").toString();
    // let img2 = Buffer.from(props.questionList[props.index][25], "base64").toString();

    
    
    return (
        <div className={styles.body}>
            
            {/* <button style={{float: 'left'}} onClick={btnHandler}>Click me!</button> */}
            {showQuestions && <section className={styles.question}>
                <h3>Question number {props.index+1}</h3>
                <div dangerouslySetInnerHTML={{__html: props.languageChosen === props.primaryLang ? props.questionList[props.index][14] : props.questionList[props.index][19]}}></div>
                <img src={"data:image/jpeg;base64," + img1 } style={{display: 'block'}} alt="" onClick={() => {setShowImageDialog(true)}}/>
                
                {showImageDialog && <ImageDialog img={img1} setShowImageDialog={setShowImageDialog} ></ImageDialog>}

                {/* <Dialog open={showImageDialog} onClose={() => setShowImageDialog(false)}>
                    <DialogTitle>{`Question ${props.index + 1}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <img src={"data:image/jpeg;base64," + img1 } style={{display: 'block'}} alt="" />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowImageDialog(false)} color="primary" autoFocus>Close</Button>
                    </DialogActions>
                </Dialog> */}

            </section>}
            {showOptions && <section className={styles.options}>
                
                <ul onChange={radioHandler}>
                    <li>
                        <label htmlFor="opt1"><input type="radio" name="ans" id={props.questionList[props.index][27][0].toLowerCase()} checked={props.answerValue === props.questionList[props.index][27][0].toLowerCase()} />{props.languageChosen === props.primaryLang ? props.questionList[props.index][15] : props.questionList[props.index][20]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt2"><input type="radio" name="ans" id={props.questionList[props.index][27][2].toLowerCase()} checked={props.answerValue === props.questionList[props.index][27][2].toLowerCase()} />{props.languageChosen === props.primaryLang ? props.questionList[props.index][16] : props.questionList[props.index][21]}</label>
                    </li>
                    {props.questionList[props.index][17] && <li>
                        <label htmlFor="opt3"><input type="radio" name="ans" id={props.questionList[props.index][27][4].toLowerCase()} checked={props.answerValue === props.questionList[props.index][27][4].toLowerCase()} />{props.languageChosen === props.primaryLang ? props.questionList[props.index][17] : props.questionList[props.index][22]}</label>
                    </li>}
                    {props.questionList[props.index][18] && <li>
                        <label htmlFor="opt4"><input type="radio" name="ans" id={props.questionList[props.index][27][6].toLowerCase()} checked={props.answerValue === props.questionList[props.index][27][6].toLowerCase()} />{props.languageChosen === props.primaryLang ? props.questionList[props.index][18] : props.questionList[props.index][23]}</label>
                    </li>}
                </ul>
            </section>}

            {props.showSubmitDialog && <SubmitDialog endTheExam={props.endTheExam} allowReview={props.allowReview} legendCtn={props.legendCtn} setShowSubmitDialog={props.setShowSubmitDialog} />}
        </div>
    )
}
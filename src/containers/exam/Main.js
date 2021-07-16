import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Body from './Body';
import Sidebar from './Sidebar';
import styles from './main.module.css'
import { useEffect , useState} from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

export default function Main () {
    const [index, setIndex] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [showBody, setShowBody] = useState(false);
    const [showFooter, setShowFooter] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const location = useLocation();
    useEffect(() => {
        console.log(location.state.examData[0]);
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
            const questionData = [...xml.querySelectorAll('anyType')].map((ele) => ele.textContent.split('~'));
            setQuestionList(questionData);
            setShowBody(true);
            setShowFooter(true);
            setShowSidebar(true);
            
        } catch(e) {
            console.log(e.response);
        }

    }

    function setIndexValue(value) {
        console.log(index);
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
    }

    return (
        <div>
            <Navbar/>
            <div className={styles.main}>
                <div className={styles.bodyAndFooter}>
                    {showBody && <Body questionList={questionList} index={index}/>}
                    {showFooter && <Footer setIndexValue={setIndexValue}/>}
                </div>
                <div className={styles.sidebar}>
                    {showSidebar && <Sidebar setIndexValue={setIndexValue}/>}
                </div>
            </div>
        </div>
    )
}
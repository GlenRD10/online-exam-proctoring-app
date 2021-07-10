import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Schedule from './Schedule';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import Topbar from './Topbar'
import styles from './dashboard.module.css'
import axios from 'axios';

export default function Dashboard (props) {
    const [examData, setExamData] = useState([]);
    const [showCards, setShowCards] = useState(false);

    const location = useLocation();
        let data = {
            exam_session: 'SUMMER-2021',
            user_id: location.state.user_id,
            user_ses_id: location.state.session_id
        }
    

    useEffect(() => {
        SendPostRequest();
    }, []);

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
                url: url + 'get_student_exam_schedule_list',                           
                crossDomain: true,
                data: data,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            const exams = [...xml.querySelectorAll('anyType')].map((ele) => ele.textContent.split('~'));
            setExamData(exams);
            setShowCards(true);
            
        } catch(e) {
            console.log(e.response);
        }

    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebarComponent}>
                <Sidebar/>
            </div>
            <div className={styles.navAndSchedule}>
                <TopNav/>
                <Topbar/>
                {showCards && <Schedule examData={examData}/>}
                {/* <Schedule examData={examData}/> */}
            </div>
        </div>
    )
}


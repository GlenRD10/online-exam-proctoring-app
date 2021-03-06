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
    const [showLegends, setShowLegends] = useState(false);
    const [filter, setFilter] = useState('all');

    const location = useLocation();
    let data = {
        exam_session: localStorage.getItem('exam_session'),
        user_id: location.state.user_id,
        user_ses_id: location.state.session_id
    }
    

    useEffect(() => {
        SendPostRequest();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            // console.log(exams);
            setExamData(exams);
            setShowCards(true);
            setShowLegends(true);
            
        } catch(e) {
            console.log(e.response);
        }

    }

    function setFilterFunction(filterValue) {
        setFilter(filterValue);
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebarComponent}>
                {showLegends && <Sidebar examData={examData} setFilterFunction={setFilterFunction}/>}
            </div>
            <div className={styles.navAndSchedule}>
                <TopNav data={data}/>
                {showLegends && <Topbar examData={examData} setFilterFunction={setFilterFunction}/>}
                {showCards && <Schedule examData={examData} filter={filter}/>}
            </div>
        </div>
    )
}


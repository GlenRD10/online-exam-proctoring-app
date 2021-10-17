import React from 'react';
// import menu_icon from './menu.png';
import profile_image from './man.png'
import styles from './topnav.module.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function TopNav(props) {
    const history = useNavigate();
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_id');

    let data = {
        exam_session: props.data.exam_session,
        user_ses_id: localStorage.getItem('user_ses_id'),
        user_id: props.data.user_id,
        ip: localStorage.getItem('ipv4')
    }

    function logoutHandler() {
        localStorage.removeItem('session_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        localStorage.removeItem('ipv4');
        localStorage.removeItem('exam_session');
        logout();
        history("/")
    }

    async function logout() {
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
                url: url + 'online_student_logout',
                crossDomain: true,
                data: data,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            // const statusReport = xml.querySelector('string').textContent.split('~');

        } catch (e) {
            console.log(e.response);
        }

    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.user}>
                <img src={profile_image} alt="" className={styles.profile} />
                <section className={styles.details}>
                    <p>{name}</p>
                    <p>{email}</p>
                </section>
            </div>
            {/* <img src={menu_icon} alt="" className={styles.dropdown} /> */}
            <button onClick={logoutHandler} className={styles.logoutBtn}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </nav>
    )
}
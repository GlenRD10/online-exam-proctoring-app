import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import publicIp from "public-ip";
// import ReCAPTCHA from "react-google-recaptcha";
import styles from "./login.module.css";
import axios from "axios"

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    // const ip = await axios.get('https://geolocation-db.com/json/')
    const ipv4 = await publicIp.v4();

    const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/online_student_login_access';
    let data = {
      exam_session: "SUMMER-2021",
      user_id: email,
      login_password: password,
      ip: ipv4
    };
    data = Object.keys(data).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    try {
      const response = await axios({
        method: 'post',
        url,
        crossDomain: true,
        data,
        headers
      });
      const parser = new DOMParser();
      const xml = parser.parseFromString(response.data, 'text/xml');
      const message = xml.querySelector('string').textContent.split('~');

      if (message[0] === 'success') {
        localStorage.setItem('session_id', message[1]);
        localStorage.setItem('user_name', message[2]);
        localStorage.setItem('user_id', message[3]);
        localStorage.setItem('ipv4', ipv4);
        localStorage.setItem('exam_session', 'SUMMER-2021');
        navigate('/dashboard', { state: { session_id: localStorage.getItem('session_id'), user_id: localStorage.getItem('user_id') } });
      }
      else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.login}>
      <h1>Candidate Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="userid" id="" placeholder="User ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" name="password" id="" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {/* <a href="https://www.google.com">Forgot Password?</a> */}
        {/* <div className={styles.captcha}>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={onChangeHandler}
                  />
                </div> */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
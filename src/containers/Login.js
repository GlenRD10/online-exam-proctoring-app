import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";
import axios from "axios"
import logo from './exam.png';

export default function Login() {
  const links = [
    {
        title: 'Home',
        href: '#'
    },
    {
        title: 'About',
        href: '#'
    },
    {
        title: 'Contact',
        href: '#'
    },
  ]
  
  function Link (props) {
    return <a href={props.href} className="link">{props.title}</a>
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/online_student_login_access';
    let data = {
        exam_session: "SUMMER-2021",
        user_id: email,
        login_password: password,
        ip: "0.0.0.0",
    };
    data = Object.keys(data).map(function(key) {
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
        console.log(message);
        alert(message);
    } catch (error) {
        console.log(error);
    }
  }

  function onChangeHandler(value) {
    console.log("Captcha value: ", value)
  }

  return (
      <div className="login-main"><div className="Login">
        <nav className="navbar">
            <h1>Welcome</h1>
            <div className="navlinks">
                {
                    links.map((link, i) => {
                        return (
                            <Link key={i} {...link}></Link>
                        )
                    })
                }
                <a href="www" className="icon" ><i className="fa fa-bars"></i></a>
            </div>
        </nav>
      <Form onSubmit={handleSubmit}>
          <h1>Login to your account</h1>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <h5>Forgot Password?</h5>

        <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChangeHandler}
        />

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>

      </Form>      

    </div>
    {/* <img src={'https://assets.materialup.com/uploads/c69e374a-ab60-4914-a4e7-1a92ab88e732/preview.jpg'} alt="" className="login-image"/> */}
    <img src={logo} alt="login" className="login-image" />
    </div>
  );
}

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  var isVerified = false;

  function handleSubmit(event) {
    event.preventDefault();
    if(isVerified) {
        alert("You have succesfully logged in");
    } else {
        alert("Please verify that you are not a robot");
    }
  }

  function onChangeHandler(value) {
    console.log("Captcha value: ", value)
  }

  return (
      <div className="login-main"><div className="Login">
      <Form onSubmit={handleSubmit}>
          <h1>Login to your account</h1>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
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
    <img src={'https://assets.materialup.com/uploads/c69e374a-ab60-4914-a4e7-1a92ab88e732/preview.jpg'} alt="" className="login-image"/>
    
    </div>
  );
}

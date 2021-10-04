import React from "react";
import Webcam from "react-webcam";
import styles from './webcamcap.module.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WebcamCap (props) {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [captureImg, setCaptureImg] = React.useState(true);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const sendImage = async () => {
        const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/';

        let data = {
            exam_session: localStorage.getItem('exam_session'),
            user_id: props.examData.user_id,
            user_ses_id: props.examData.user_ses_id,
            exam_code: props.examData.exam_code,
            subject_code: props.examData.subject_code,
            exam_id: props.examData.exam_id,
            scheduler_id: props.examData.scheduler_id,
            roll_number: props.examData.roll_number,
            student_photo_image: imgSrc.slice(23),
            ip: localStorage.getItem('ipv4')
        };

        data = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios({
                method: 'post',
                url: url + 'student_exam_photo_save',
                crossDomain: true,
                data,
                headers
            });
            console.log(res);
        } catch (e) {
            console.log(e.response);
        }
    }
    
    React.useEffect(() => {
        let interval;
        if (captureImg) {
            interval = setInterval(capture, props.sendImgTimer * 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [captureImg, capture]);

    React.useEffect(() => {
        if(imgSrc) sendImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgSrc]);

    const navigate = useNavigate();
    const mediaErrorHandler = () => {
        navigate('/dashboard', { state: { session_id: localStorage.getItem('session_id'), user_id: localStorage.getItem('user_id') } })
    }

    return (
        <div className={styles.webcam}>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{facingMode: 'user'}}
                onUserMediaError={mediaErrorHandler}
            />
            <button onClick={() => setCaptureImg(false)}>Capture</button>
        </div>
    )
}
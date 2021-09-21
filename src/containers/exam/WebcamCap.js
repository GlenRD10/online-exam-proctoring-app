import React from "react";
import Webcam from "react-webcam";
import styles from './webcamcap.module.css';

export default function WebcamCap () {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [captureImg, setCaptureImg] = React.useState(true);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
    React.useEffect(() => {
        let interval;
        if (captureImg) {
            interval = setInterval(capture, 10000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [captureImg, capture]);
    // const captureimg = setInterval(() => {
    //     capture();
    // }, 10000);

    // const endcapture = () => {
    //     clearInterval(captureimg);
    // }

    return (
        <div>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{facingMode: 'user'}}
            />
            <button onClick={() => setCaptureImg(false)}>Capture</button>
        </div>
    )
}
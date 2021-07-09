import React from 'react';
import styles from './schedule.module.css';

export default function Schedule (props) {
    const filteredArray = props.examData.filter((item, index) => {
        if (item[13] === 'Start Exam')
            item[13] = 'ongoing';
        else if (item[13] === 'Exam Allocated') 
            item[13] = 'yet-to-start';
        else if (item[13] === 'Exam Expired')
            item[13] = 'expired';
        else if (item[13] === 'Completed')
            item[13] = 'completed';
        return index%2 === 0;
    })
    
    return (
        <section className={styles.schedule}>
            {filteredArray.map(data => <Card
            title={data[1]}
            status={data[13]} 
            starts={data[8]} 
            expires={data[9]} 
            timezone={data[7]}
            questions={data[10]}
            duration={data[11]}
            timeRemaining={data[12]}
        />)}
        </section>
    );
    // return (
    //     <section className="schedule">
    //         <Card status='ongoing'/>
    //         <Card status='expired'/>
    //         <Card status='expired'/>
    //         <Card status='yet-to-start'/>
    //         <Card status='ongoing'/>
    //         <Card status='completed'/>
    //     </section>    
    // )
}

const pStyle = {
    textAlign: 'center',
    fontWeight: 'bold'
}

const Card = (props) => {
    let status = props.status;
    let statusTag = null;
    if (status === 'ongoing') {
        statusTag = <div className={styles.proceedBtn}><button><i className="fa fa-play-circle"></i> Proceed</button></div>;
        status = styles.ongoing;
    }
    else if (status === 'expired') {
        statusTag = <p style={pStyle}>Link has expired</p>;
        status = styles.expired;
    }
    else if (status === 'yet-to-start') {
        statusTag = <p style={pStyle}>Link will be available in</p>;
        status = styles.yetToStart;
    }
    else if (status === 'completed') {
        statusTag = <p style={pStyle}>Completed</p>;
        status = styles.completed;
    }

    return (
        <article className={`${status} ${styles.card}`}>
            <h3>{props.title}</h3>
            <div className={styles.container}>
                <p>Starts: {props.starts}</p>
                <p>Expires:{props.expires}</p>
                <p>Time Zone:{props.timezone}</p>
                <p>Number of Questions:{props.questions}</p>
                <p>Test Duration:{props.duration}</p>
                <p>Time Remaining:{props.timeRemaining}</p>
            </div>
            <span className={styles.fadeEffect}></span>
            {statusTag}
        </article>
    )
}
import React from 'react';
import './schedule.css';

export default function Schedule (props) {
    console.log("schedule");
    console.log(props.examData);
    const filteredArray = props.examData.filter((item, index) => {
        return index%2 === 0;
    })

    let statusArray = filteredArray.map(item => item[13]);
    console.log(statusArray);
    
    return (
        <section className="schedule">
            {filteredArray.map(data => <Card 
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
    const status = props.status;
    let statusTag = null;
    if (status === 'Start Exam')
        statusTag = <div className="proceedBtn"><button><i className="fa fa-play-circle"></i> Proceed</button></div>
    else if (status === 'Exam Expired')
        statusTag = <p style={pStyle}>Link has expired</p>
    else if (status === 'Exam Allocated')
        statusTag = <p style={pStyle}>Link will be available in</p>
    else if (status === 'completed')
        statusTag = <p style={pStyle}>Completed</p>

    return (
        <article className={status + ' card'}>
            <h3>Exam Name</h3>
            <div className="container">
                <p>Starts: {props.starts}</p>
                <p>Expires:{props.expires}</p>
                <p>Time Zone:{props.timezone}</p>
                <p>Number of Questions:{props.questions}</p>
                <p>Test Duration:{props.duration}</p>
                <p>Time Remaining:{props.timeRemaining}</p>
            </div>
            <span className="fadeEffect"></span>
            {statusTag}
        </article>
    )
}
import './ExamCard.css'

function ExamCard(props) {
    const pStyle = {
        textAlign: 'center',
        fontWeight: 'bold'
    }

    const status = props.status;
    let statusTag = null;
    if (status === 'ongoing')
        statusTag = <div style={{textAlign: 'center'}}><button className="proceedBtn"><i className="fa fa-play-circle"></i> Proceed</button></div>
    else if (status === 'expired')
        statusTag = <p style={pStyle}>Link has expired</p>
    else if (status === 'yet-to-start')
        statusTag = <p style={pStyle}>Link will be available in</p>
    else if (status === 'completed')
        statusTag = <p style={pStyle}>Completed</p>

    return(
        <article className={status + ' card'}>
            <h3>Exam Name</h3>
            <div className="container">
                <p>Starts:</p>
                <p>Expires:</p>
                <p>Time Zone:</p>
                <p>Number of Questions:</p>
                <p>Test Duration:</p>
                <p>Time Remaining:</p>
            </div>
            <span className="fadeEffect"></span>
            {statusTag}
        </article>
    );
}

export default ExamCard;
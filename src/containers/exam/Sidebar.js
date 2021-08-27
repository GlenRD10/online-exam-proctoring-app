import React from 'react';
import styles from './sidebar.module.css';

export default function Sidebar (props) {
    function BtnHandler(index) {
        props.setIndexValue(index-1);
    }

    return (
        <div className={styles.sidebar}>
            {/* <section className={styles.user}>
                <i className="fa fa-user"></i>
                <p>User Name</p>
            </section> */}
            <section className={styles.nav}>
                {props.questionList.map((el, index) => {
                    if(index !== 0) 
                        return <button style={{backgroundColor: props.buttonColors[index-1]}}onClick={() => BtnHandler(index)}>{index}</button>
                    else 
                        return null;
                })}
            </section>
            <section className={styles.legend}>
                <h4>Overall Summary</h4>
                <ul>
                    <li><span style={{backgroundColor: 'green'}}>{props.legendCtn[0]}</span> Attempted</li>
                    <li><span style={{backgroundColor: '#9ad1d4'}}>{props.legendCtn[1]}</span> Not Attempted</li>
                    {props.allowReview && <li><span style={{backgroundColor: 'orange'}}>{props.legendCtn[2]}</span> Attempted and Review</li>}
                    {props.allowReview && <li><span style={{backgroundColor: 'brown'}}>{props.legendCtn[3]}</span> Not Attempted and Review</li>}
                </ul>
            </section>
        </div>
    )
}
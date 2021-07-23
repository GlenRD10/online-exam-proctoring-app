import React from 'react';
import styles from './sidebar.module.css';

export default function Sidebar (props) {
    function BtnHandler(index) {
        console.log("Button was clicked");
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
                        return <button onClick={() => BtnHandler(index)}>{index}</button>
                    else 
                        return null;
                })}
            </section>
            <section className={styles.legend}>
                <h4>Overall Summary</h4>
                <ul>
                    <li><span>0</span> Attempted</li>
                    <li><span>0</span> Not Attempted</li>
                    <li><span>0</span> Attempted and Review</li>
                    <li><span>0</span> Not Attempted and Review</li>
                </ul>
            </section>
        </div>
    )
}
import React from 'react';
import styles from './sidebar.module.css'

export default function Sidebar (props) {
    
    let ongoingCards = 0, yetToStartCards = 0, expiredCards = 0, completedCards = 0;

    console.log(props.examData);
    const filteredArray = props.examData.filter((item, index) => {
        console.log(item[13]);
        if (item[13] === 'ongoing' || item[13] === 'Start Exam'){
            ongoingCards += 1;
        }            
        else if (item[13] === 'yet-to-start' || item[13] === 'Exam Allocated') {
            yetToStartCards += 1;
        }
        else if (item[13] === 'expired' || item[13] === 'Exam Expired') {
            expiredCards += 1;
        }            
        else if (item[13] === 'completed' || item[13] === 'Completed') {
            completedCards += 1;
        }
        return index !== props.examData.length - 1;
    });

    function clickHandler(e) {
        const value = e.currentTarget.getAttribute("data-value");
        props.setFilterFunction(value);
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.search}><input type="text" name="" id="" placeholder="Search..." className={styles.searchbar} /></div>
            <ul>
                <li>
                    <button onClick={clickHandler} data-value="all" className={styles.drawerBtn}>
                        <span className={styles.text}>
                            <span className={styles.colorCode} style={{backgroundColor: 'brown'}}></span>
                            All
                        </span>
                        <span className={styles.count}>{filteredArray.length}</span>
                    </button>
                </li>
                <li>
                    <button onClick={clickHandler} data-value="yet-to-start" className={styles.drawerBtn}>
                        <span className={styles.text}>
                            <span className={styles.colorCode} style={{backgroundColor: 'chocolate'}}></span>
                            Yet to Start
                        </span>
                        <span className={styles.count}>{yetToStartCards}</span>
                    </button>
                </li>
                <li>
                    <button onClick={clickHandler} data-value="ongoing" className={styles.drawerBtn}>
                        <span className={styles.text}>
                            <span className={styles.colorCode} style={{backgroundColor: 'lightgreen'}}></span>
                            Ongoing
                        </span>
                        <span className={styles.count}>{ongoingCards}</span>
                    </button>
                </li>
                <li>
                    <button onClick={clickHandler} data-value="completed" className={styles.drawerBtn}>
                        <span className={styles.text}>
                            <span className={styles.colorCode} style={{backgroundColor: 'darkgreen'}}></span>
                            Completed
                        </span>
                        <span className={styles.count}>{completedCards}</span>
                    </button>
                </li>
                <li>
                    <button onClick={clickHandler} data-value="expired" className={styles.drawerBtn}>
                        <span className={styles.text}>
                            <span className={styles.colorCode} style={{backgroundColor: 'red'}}></span>
                            Expired
                        </span>
                        <span className={styles.count}>{expiredCards}</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}
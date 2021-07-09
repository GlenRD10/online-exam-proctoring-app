import React from 'react';
import styles from './sidebar.module.css'

export default function Sidebar () {
    return (
        <div className={styles.sidebar}>
            <div className={styles.search}><input type="text" name="" id="" placeholder="Search..." className={styles.searchbar} /></div>
            <ul>
                <li><button className={styles.drawerBtn}><span className={styles.text}><span className={styles.colorCode}></span>All</span> <span className={styles.count}>12</span></button></li>
                <li><button className={styles.drawerBtn}><span className={styles.text}><span className={styles.colorCode}></span>Yet to Start</span> <span className={styles.count}>03</span></button></li>
                <li><button className={styles.drawerBtn}><span className={styles.text}><span className={styles.colorCode}></span>Resume</span> <span className={styles.count}>04</span></button></li>
                <li><button className={styles.drawerBtn}><span className={styles.text}><span className={styles.colorCode}></span>Completed</span> <span className={styles.count}>04</span></button></li>
                <li><button className={styles.drawerBtn}><span className={styles.text}><span className={styles.colorCode}></span>Expired</span> <span className={styles.count}>01</span></button></li>
            </ul>
        </div>
    )
}
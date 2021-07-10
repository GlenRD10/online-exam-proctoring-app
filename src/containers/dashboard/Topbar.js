import React from 'react';
import styles from './topbar.module.css';

export default function Topbar () {
    return (
        <ul className={styles.topbar}>
            <li>
                <button className={styles.drawerBtn}>
                    <span className={styles.text}>
                        <span className={styles.colorCode} style={{backgroundColor: 'brown'}}></span>
                        All
                    </span>
                    <span className={styles.count}>12</span>
                </button>
            </li>
            <li>
                <button className={styles.drawerBtn}>
                    <span className={styles.text}>
                        <span className={styles.colorCode} style={{backgroundColor: 'chocolate'}}></span>
                        Yet to Start
                    </span>
                    <span className={styles.count}>03</span>
                </button>
            </li>
            <li>
                <button className={styles.drawerBtn}>
                    <span className={styles.text}>
                        <span className={styles.colorCode} style={{backgroundColor: 'lightgreen'}}></span>
                        Ongoing
                    </span>
                    <span className={styles.count}>04</span>
                </button>
            </li>
            <li>
                <button className={styles.drawerBtn}>
                    <span className={styles.text}>
                        <span className={styles.colorCode} style={{backgroundColor: 'darkgreen'}}></span>
                        Completed
                    </span>
                    <span className={styles.count}>04</span>
                </button>
            </li>
            <li>
                <button className={styles.drawerBtn}>
                    <span className={styles.text}>
                        <span className={styles.colorCode} style={{backgroundColor: 'red'}}></span>
                        Expired
                    </span>
                    <span className={styles.count}>01</span>
                </button>
            </li>
        </ul>
    )
}
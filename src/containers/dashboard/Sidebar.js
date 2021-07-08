import React from 'react';
import './sidebar.css'

export default function Sidebar () {
    return (
        <div className="sidebar">
            <div className="search"><input type="text" name="" id="" placeholder="Search..." className="searchbar" /></div>
            <ul>
                <li><button className="drawerBtn"><span className="text"><span className="color-code"></span>All</span> <span className="count">12</span></button></li>
                <li><button className="drawerBtn"><span className="text"><span className="color-code"></span>Yet to Start</span> <span className="count">03</span></button></li>
                <li><button className="drawerBtn"><span className="text"><span className="color-code"></span>Resume</span> <span className="count">04</span></button></li>
                <li><button className="drawerBtn"><span className="text"><span className="color-code"></span>Completed</span> <span className="count">04</span></button></li>
                <li><button className="drawerBtn"><span className="text"><span className="color-code"></span>Expired</span> <span className="count">01</span></button></li>
            </ul>
        </div>
    )
}
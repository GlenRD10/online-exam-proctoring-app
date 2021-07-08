import React from 'react';
import menu_icon from './menu.png';
import profile_image from './man.png'
import './topnav.css'


export default function TopNav () {
    const name = 'Rishabh Pathak';
    const email = 'rishabh2000.pathak@outlook.com'
    return (
        <nav className="navbar">
            <div className="user">
                <img src={profile_image} alt="" className="profile" />
                <section className="details">
                    <p>{name}</p>
                    <p>{email}</p>
                </section>
            </div>
            <img src={menu_icon} alt="" className="dropdown" />
        </nav>
    )
}
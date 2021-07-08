import React from 'react';
import menu_icon from './menu.png';
import profile_image from './man.png'
import './topnav.css'


export default function TopNav () {
    const name = localStorage.getItem('user_name');
    const email = localStorage.getItem('user_id');
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
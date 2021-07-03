import React from "react";
// import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
// import Nav from "react-bootstrap/Nav";
// import { LinkContainer } from "react-router-bootstrap";

import "./App.css"

const links = [
  {
      title: 'Home',
      href: '#'
  },
  {
      title: 'About',
      href: '#'
  },
  {
      title: 'Contact',
      href: '#'
  },
]

function Link (props) {
  return <a href={props.href} className="link">{props.title}</a>
}

function App() {
  return (
    <div>
      <nav className="navbar">
            <h1>Welcome</h1>
            <div className="navlinks">
                {
                    links.map((link, i) => {
                        return (
                            <Link key={i} {...link}></Link>
                        )
                    })
                }
                <a href="www" className="icon" ><i className="fa fa-bars"></i></a>
            </div>
        </nav>
      <Routes />
    </div>
  );
}


export default App;


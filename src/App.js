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
      {/* <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Welcome
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/signup">
              <Nav.Link>Contact Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}
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
            </div>
        </nav>
      <Routes />
    </div>
  );
}


export default App;


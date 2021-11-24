import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Header.css";

const Header = (props) => {
  var links;
  if (props.selected === "Home")
    links = (
      <>
        <Nav.Link href="/" className="selectedMenu">
          Home
        </Nav.Link>
        <Nav.Link href="/goal">Goal Setting</Nav.Link>
      </>
    );
  else if (props.selected === "Goal")
    links = (
      <>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/goal" className="selectedMenu">
          Goal Setting
        </Nav.Link>
      </>
    );
  else
    links = (
      <>
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/goal">Goal Setting</Nav.Link>
      </>
    );

  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/" className="logo">
          Uplife
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">{links}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

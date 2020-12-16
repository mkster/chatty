
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Emoji from "./Emoji";

//rendering a links here as router links
export default function NavbarChatty(){
  return (
    <Navbar expand={true} collapseOnSelect bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/chats">Chatty<Emoji emoji="👋🏼" label="waving hand"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/chats">Chats</Nav.Link>
          <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link target="_blank" href="https://github.com/mkster/chatty">Github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
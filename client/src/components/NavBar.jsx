import { Nav, Navbar, NavDropdown, Container, Image } from "react-bootstrap";
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

import Moon from "../assets/moon.jpg";

const NavBar = ({ isDarkMode, toggleDarkMode }) => {

    // stuff here

  return (
    <>
        <Navbar collapseOnSelect expand="lg" 
            data-bs-theme={`${isDarkMode ? "dark" : "light"}`}
            className={`${isDarkMode ? "bg-dark text-light" : "bg-body-tertiary"}`}
        >
            <Container>
                <Navbar.Brand href="#home">Our Daily Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#features">About</Nav.Link>
                    <Nav.Link href="#pricing">Contact</Nav.Link>
                    <NavDropdown title="Write" id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Write</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Published</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Unpublished
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="welcome">
                    <Nav.Link href="#deets">
                        {
                            isDarkMode ? (
                                <FaRegMoon onClick={toggleDarkMode} fontSize={20}/> 
                            ) : (
                                <IoSunnyOutline onClick={toggleDarkMode} fontSize={30}/>
                            )
                        }
                    </Nav.Link>
                    <Nav.Link>Welcome Jose</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        <Image className="profilepic" src={Moon} roundedCircle />
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default NavBar
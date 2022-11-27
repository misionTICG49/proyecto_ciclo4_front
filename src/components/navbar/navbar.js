import React from "react";
import { Container, Navbar, Nav, DropdownButton, Dropdown, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import './navbar.css';
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();

export default class menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    Logout(){
        cookies.remove('_s');
        window.location.reload();

    }
    render() {
        return (
            <Navbar fixed="top" id="navbar" bg="primary" expand="lg" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Agenda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {/*<Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>*/}
                    </Nav>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Usuario">
                        <Dropdown.Header id="dropdown-header">
                            <Row>
                            <FontAwesomeIcon icon={faUserCircle} />
                            </Row>
                            <Row>
                            #Usuario#
                            </Row>                            
                        </Dropdown.Header>
                        <Dropdown.Divider />

                        <Dropdown.Item onClick={() => this.Logout()}>Cerrar Sesión</Dropdown.Item>
                        {/*<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                    </DropdownButton>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

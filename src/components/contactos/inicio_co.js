import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import "./contactos.css";
import ContactosBuscar from "./crud/buscar";
import ContactosCrear from "./crud/crear";
import ContactosEditar from "./crud/editar";

export default class Contactos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        currentTab:"buscar",
        _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdContacto = this.setIdContacto.bind(this);
    this.getIdContacto = this.getIdContacto.bind(this);
  }
  changeTab(tab) {
    this.setState({ currentTab: tab });
  }
  setIdContacto(id) {
    this.setState({ _id: id});
  }
  getIdContacto() {
      return this.state._id;
  }
  render() {
    return (
      <Container id="contactos-container">
        <Row>
          <Nav fill variant="tabs" defaultActiveKey="/buscar"
          onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === "buscar" ? (
            <ContactosBuscar
              changeTab={this.changeTab}
              setIdContacto={this.setIdContacto}
            />
          ) : this.state.currentTab === "crear" ? (
            <ContactosCrear changeTab={this.changeTab} />
          ) : (
            <ContactosEditar
              changeTab={this.changeTab}
              getIdContacto={this.getIdContacto}
            />
          )}
        </Row>
      </Container>
    );
  }
}

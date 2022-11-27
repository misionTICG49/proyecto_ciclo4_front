import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../contactos.css";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class ContactosCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      message: {
        text: "",
        show: false,
      },
      loading: false,
      contacto: {
        nombre: "",
        apellido: "",
        email: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
  }
  setValue(inicio_co, value) {
    this.setState({
      contacto: {
        ...this.state.contacto,
        [inicio_co]: value,
      },
    });
  }
  guardarContactos() {
    this.setState({ loading: true });
    request
      .post("/contactos", this.state.contacto)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }
  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
  }
  render() {
    return (
      <Container id="contactos-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />
        <Loading show={this.state.loading} />
        <Row>
          <h1>Crear contactos</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={this.state.contacto.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                value={this.state.contacto.apellido}
                onChange={(e) => this.setValue("apellido", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.state.contacto.email}
                onChange={(e) => this.setValue("email", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarContactos())}
            >
              Guardar contacto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "../contactos.css";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationPrompt from "../../prompts/confirmation";

export default class ContactosEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idContacto: this.props.getIdContacto(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: "Modificar contacto",
        text: "¿Desea modificar el contacto?",
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
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  componentDidMount() {
    this.getContacto();
  }
  getContacto() {
    this.setState({ loading: true });
    request
      .get(`/contactos/${this.state.idContacto}`)
      .then((response) => {
        this.setState({
          contacto: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
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
      .put(`/contactos/${this.state.idContacto}`, this.state.contacto)
      .then((response) => {
        if (response.data.exito) {
          this.props.changeTab("buscar");
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
  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }
  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.guardarContactos()
    );
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
        <ConfirmationPrompt
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
        <Loading show={this.state.loading} />
        <Row>
          <h1>Editar contacto</h1>
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
              onClick={() =>
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
              //onClick={()=> console.log(this.guardarContactos())}
            >
              Editar contacto
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

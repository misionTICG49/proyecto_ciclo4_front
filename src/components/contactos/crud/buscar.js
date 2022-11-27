import React from "react";
import { Container, Row } from "react-bootstrap";
import "../contactos.css";
import DataGrid from "../../grid/grid";
import ConfirmationPrompt from "../../prompts/confirmation";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";


const columns = [
  {
    dataField: "_id",
    text: "ID",
    hidden: true,
  },
  {
    dataField: "nombre",
    text: "Nombre",
  },
  {
    dataField: "apellido",
    text: "Primer Apellido",
  },
  {
    dataField: "email",
    text: "Correo Electronico",
  },
  {
    dataField: "testadorId",
    text: "TestadorID",
    hidden: true,
  },
];

export default class ContactosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idContacto: null,
      message:{
        text: "",
        show: false,
      },
      confirmation:{
        title:"Eliminar el contacto",
        text: "¿Desea eliminar el contacto?",
        show: false,
      }
    };
    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  componentDidMount() {}
  onClickEditButton(row) {
    this.props.setIdContacto(row._id);
    this.props.changeTab('editar');
    }
  onClickDeleteButton(row){
    this.setState({
      idContacto: row._id,
      confirmation:{
        ...this.state.confirmation,
        show: true,
      },
    });
  }
  onCancel(){
    this.setState({
      confirmation:{
        ...this.state.confirmation,
        show: false,
      }
    })
  }
  onConfirm(){
    this.setState({
      confirmation:{
        ...this.state.confirmation,
        show: false,
      },
    },
    this.eliminarContacto()
    );
  }
  eliminarContacto(){
    this.setState({ loading: true});
    request
    .delete(`/contactos/${this.state.idContacto}`)
    .then((response) => {
      this.setState ({
        loading: false,
         message: {
           text: response.data.msg,
           show:true,
         },
      });
      this.setState({ loading: false});
      if(response.data.exito) this.reloadPage();
    })
    .catch((error) => {
      console.error(error);
      this.setState({ loading: false});
    });
  }
  reloadPage(){
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }
  render() {
    return (
      <Container id="contactos-buscar-container">
        <ConfirmationPrompt 
        show = {this.state.confirmation.show}
        title = {this.state.confirmation.title}
        text = {this.state.confirmation.text}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm}
        />
        <MessagePrompt  
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
          />
        <Loading show = {this.state.loading}/>
        <Row>
          <h1>Buscar Contactos</h1>
        </Row>
        <Row>
          <DataGrid url="/contactos" columns={columns} 
          showEditButton={true} 
          showDeleteButton={true} 
          onClickEditButton ={this.onClickEditButton}
          onClickDeleteButton ={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
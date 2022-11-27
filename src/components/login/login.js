import React from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import app from "../../App.json";
import './login.css';
import {isNull} from 'util';
import Cookies from "universal-cookie";
import { calcularExpirarSesion } from "../helper/helper";
import Loading from "../loading/loading";

const { APIHOST } = app;
const cookies = new Cookies();

//const { history } = this.props;


export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            identificacion: '',
            pass: '',
        };
    }
    iniciarSesion(){
        this.setState({loading: true});
        axios.post(`${APIHOST}/login`, {
            identificacion: this.state.identificacion,
            pass: this.state.pass,
        })
        .then((response) =>{
            if (isNull(response.data.token)){
                alert("Usuario y/o contraseña invalidos");
            } else{
                cookies.set('_s', response.data.token,{
                    path: '/',
                    expires: calcularExpirarSesion(),
                })
                this.props.history.push(("/contactos"));
                window.location.reload();
            }
            this.setState({loading: false});
        })
        .catch((error) => {console.log(error);
            this.setState({loading: false});
        });
        //{/*alert(`usuario: ${this.state.usuario} - password: ${this.state.pass}`);*/}
    }
    render() { 
        return (
            <Container id="login-container" >
                <Loading show={this.state.loading}/>
                <Row>
                    <Col>
                    <Row>
                        <h2>Iniciar Sesión</h2>
                    </Row>
                    <Row>
                        <Col 
                        sm="12"
                        xs="12"
                        md={{ span: 4, offset: 4}}
                        lg={{ span: 4, offset: 4}}
                        xl={{ span: 4, offset: 4}}>
                        <Form>
                            <Form.Group>
                                <Form.Label className='Form-Label'>Identificacion</Form.Label>
                                <Form.Control 
                                    onChange={(e)=>
                                    this.setState({identificacion: e.target.value})} />
                                    
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className='Form-Label'>Contraseña</Form.Label>
                                <Form.Control type="password" 
                                onChange={(e)=>
                                    this.setState({pass: e.target.value})} />

                            </Form.Group>

                            <Button variant="primary" 
                                onClick={() => {this.iniciarSesion();}}>
                                Iniciar Sesión
                            </Button>
                        </Form>
                        </Col>
                        
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        );
    }
}


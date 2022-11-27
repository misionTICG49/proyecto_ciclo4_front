//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Login from "./components/login/login";
import { Container } from 'react-bootstrap';
import Menu from './components/navbar/navbar';
import AppRouter from './components/router/router';
//import { Container, Form, Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';

function App() {
  return (
    <div className="App">
      <Menu />
      <Container>
        <AppRouter />
      </Container>
    </div>
  );
}

export default App;

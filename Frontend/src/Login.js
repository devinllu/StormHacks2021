import React from 'react';
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import './App.css'
import { Input, Label, Button } from 'reactstrap'
import { Container, Card, Row, Jumbotron, Form, FormGroup, InputGroup } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components';
import $ from 'jquery';
import Popper from 'popper.js';
import boatImage from './assets/cropped-2.jpg'
import mountains from './assets/mountains.jpg'

const Styles = styled.div`
.jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
}
.overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}
`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleAuthentication = (response) => {
        axios.post('/login', response).then(res => {
            this.props.history.push("/profile")
        })

    }

    responseGoogle = (response) => {
        console.log(response.profileObj);
    }

    render() {
        return (
            <div className="App">
                <Styles>
                    <Jumbotron className="jumbo">
                        <div className="overlay">
                        </div>
                    </Jumbotron>
                </Styles>

                <Form className="login-form">
                    <h1>Welcome to <span className="font-weight-bold"><br></br>G-Centro</span></h1>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" placeholder="Email"/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" placeholder="Password"/>
                    </FormGroup>
                    <Button className="btn-lg btn-dark btn-block">Log in</Button><br></br>
                    <div className="text-center pt-3"> Or continue with Google login</div>
                <GoogleLogin
                    clientId="793626717531-e36vg4ur9avp1n6dvphtnj9kh4tb7j4v.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.handleAuthentication}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    />
                </Form>



            </div>
        );
    }
}

export default App;
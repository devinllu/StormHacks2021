import React from 'react';
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { Container, Card, Row, Jumbotron, Form } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components';
import $ from 'jquery';
import Popper from 'popper.js';
import boatImage from './assets/cropped.jpg'

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
            <div>
                <Styles>
                    <Jumbotron className="jumbo">
                        <div className="overlay">
                            <h1>Welcome to our StormHacks project</h1>
                        </div>
                    </Jumbotron>
                </Styles>
                <button type="button" class="btn btn-success">Success</button>
                <Container className="bg-light">
                    <Row className="text-center">
                        <GoogleLogin
                        clientId="793626717531-e36vg4ur9avp1n6dvphtnj9kh4tb7j4v.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.handleAuthentication}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
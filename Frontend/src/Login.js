import React from 'react';
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Pokemon from './Pokemon'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: '',
            redirect: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({usernameValue: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({passwordValue: event.target.value});
    }

    handleSubmit(event) {
        alert('Username: ' + this.state.usernameValue + 'Password: ' + this.state.passwordValue);
        event.preventDefault();
    }

    handleAuthentication = (response) => {
        axios.post('/login', response).then(res => {
            console.log("new test")
            this.props.history.push("/profile")
            console.log("testing")
        })

    }

    responseGoogle = (response) => {
        console.log(response.profileObj);
    }

    render() {
        const { redirect } = this.state;
        return (
            <div>
                <GoogleLogin
                clientId="793626717531-e36vg4ur9avp1n6dvphtnj9kh4tb7j4v.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.handleAuthentication}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                />
            </div>
        );
    }
}

export default App;
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: '',
            passwordValue: ''
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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <label>
                    Username:
                    <input 
                        type="text" 
                        value={this.state.value} 
                        onChange={this.handleUsernameChange} 
                    />
                </label>

                <label>
                    Password:
                    <input 
                        type="text" 
                        value={this.state.value} 
                        onChange={this.handlePasswordChange} 
                    />
                </label>
                
                <input type="submit" value="Submit" />

            </form>
        );
    }
}

export default App;
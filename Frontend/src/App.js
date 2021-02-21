import React from 'react';
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Pokemon from './Pokemon'
import Login from './Login'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/profile" component={Pokemon}></Route>
                    <Route path="/" exact component={Login}></Route>
                </Switch>
                
            </Router>
        )
    }
}

export default App;
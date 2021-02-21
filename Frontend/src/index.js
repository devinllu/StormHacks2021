import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Profile from './Components/ProfileData'

ReactDOM.render(
    // <App />, 
    // <Pokemon />, 
    <Profile profileData={{
        Name: "",
        Contacts: [""],
        Games: [""],
    }}/>,
    //<App/>,
    document.getElementById('root')
);
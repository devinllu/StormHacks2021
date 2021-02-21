import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Pokemon from './Pokemon';
import Profile from './Components/ProfileData';

ReactDOM.render(
    // <App />, 
    // <Pokemon />, 
    <Profile profileData={{
        Name: "",
        Contacts: [""],
        Games: [""],
    }}/>,
    document.getElementById('root')
);
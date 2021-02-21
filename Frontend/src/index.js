import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Pokemon from './Pokemon';
import Profile from './Components/ProfileData';
import DocumentMeta from 'react-document-meta'


const meta = {
    title: 'meta',
    meta: {
      charset: 'utf-8',
      name: "viewport",
      content:"minimum-scale=1, initial-scale=1, width=device-width",
    }
  };

ReactDOM.render(
    // <App />, 
    // <Pokemon />, 
    <DocumentMeta {...meta} >
        <Profile profileData={{
            Name: "",
            Contacts: [""],
            Games: [""],
        }}/>,
    </DocumentMeta>,
    document.getElementById('root')
);
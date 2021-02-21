import React from 'react';
import Axios from 'axios';

var id = "andy";

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    
    componentDidMount() {

        // Profile Get
        Axios.get(`/profiles/${id}`)
        .then((response) => {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })

        Axios.post(`/profiles/${id}`, {
            "name": "John O.",
            "contact": ["andyIsCool", "Ifly"],
            "games": ["COD", "animestuff", "among us" ]
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        // Pokemon Get
        Axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
            .then((response) => {
                console.log(response.data);
                this.setState({ data: response.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    
    render() {
        return (
            <ul>
                <li>{this.state.data.name}</li>
                <li>{this.state.data.id}</li>
            </ul>
        )
    }
}

export default Pokemon;


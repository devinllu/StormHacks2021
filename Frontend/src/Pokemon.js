import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    
    componentDidMount() {
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
            <Link to="/">home page</Link>
        )
    }
}

export default Pokemon;


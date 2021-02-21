import { css } from 'jquery';
import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import { FormControl } from 'react-bootstrap';
import { Col } from 'reactstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup';



import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



function Profile(){

    const [profile, setProfile] = React.useState({   
        Name: "Andy Wang",
        Contacts: ["Devin Lu", "John Ordoyo", "Matthew Wang"],
        Games: ["Chess.com", "League of Legends", "Minecraft", "Warzone"]
    })

    const [open, setOpen] = React.useState(false);

    const applyProfileChanges = (profileData) => {
        setProfile({
            Name: profileData.Name,
            Contacts: profileData.Contacts.slice(),
            Games: profileData.Games.slice(),
        });
        // Apply set to backend here
    }

    // axios.get("/users", profileData.profileObj.googleId)

    const profileData = profile;

    return (
        <div>
            <label> Name: </label>
            <h6>{profile.Name}</h6>
            <label> Contacts: </label>
            <ListGroup>
            {profile.Contacts.map((contact, index) => (
                <ListGroup.Item 
                    variant="dark"
                    key={index}>
                    {contact}
                </ListGroup.Item>
            ))}
            </ListGroup>
            <label> Games: </label>
            <ListGroup>
                {profile.Games.map((game, index) => (
                    <ListGroup.Item 
                        variant="dark"
                        key={index}>
                    {game}</ListGroup.Item>
                ))}
            </ListGroup>
            <Button
            onClick={()=> setOpen(!open)}
            aria-controls="editProfile">
                Edit Profile
            </Button>
            <Collapse in={open}>
                <div id="editProfile">
                    <EditProfileForm profileData={profileData} applyChanges={applyProfileChanges} />
                </div>
            </Collapse>
            
        </div>
        
    );
}

function EditProfileForm(props){
    
    const [name, setName] = React.useState(props.profileData.Name);
    const [contacts, setContacts] = React.useState(props.profileData.Contacts);
    const [games, setGames] = React.useState(props.profileData.Games);

    const handleSubmit = () => {
        const newProfileData = {
            Name: name,
            Contacts: contacts,
            Games: games,
        }
        props.applyChanges(newProfileData);
    };

    return (
        <Container fluid>
            <Row >
                <InputGroup >
                    <InputGroup.Prepend>
                        <InputGroup.Text>Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        onChange={
                            (e) =>
                            {
                                setName(e.target.value);
                            }
                        }
                    >
                    </FormControl>
                </InputGroup>
            </Row>
            <Row>
                <FormListComponent
                    entryList={contacts.slice()}
                    entry={""}
                    entryName={"Contact"}
                    applyChanges={
                        (newEntries) => {
                            setContacts(newEntries);
                        }
                    }
                />
            </Row>
            <Row>
                <FormListComponent
                    entryList={games.slice()}
                    entry={""}
                    entryName={"Game"}
                    applyChanges={
                        (newEntries) => {
                            setGames(newEntries);
                        }
                    }
                />
            </Row>
            <Row>
                <Button variant= "dark"
                    onClick={handleSubmit}>Apply Profile Changes</Button>
            </Row>
            
        </Container>
        
        
    )
}

// --- Custom Form List Component --- //
// @TODO entry is a string not an object, so we might need to watch out for that
function FormListComponent(props){
    
    const [entries, setEntries] = React.useState(props.entryList);

    const addNewEntry = () => {
        const newEntries = entries.slice();
        newEntries.push(props.entry);
        setEntries(newEntries);
    }

    const submit = () => {
        props.applyChanges(entries);
    }
    
    return(
        <Container fluid>
            <Row>
                <ButtonGroup size="sm">
                    <Button
                        variant="success"
                        onClick={addNewEntry}
                    >{`Add new ${props.entryName}`}</Button>
                    <Button
                        variant="secondary"
                        onClick={submit}
                    >{`Apply new ${props.entryName}s`}</Button>
                </ButtonGroup>
            </Row>
            <Row>

                <ul>
                {entries.map((item, index) => (
                    <FormListElement
                        entry={item}
                        entryName={props.entryName}
                        onEntry={
                            (value) => {
                                const newEntries = entries.slice();
                                newEntries[index] = value;
                                setEntries(newEntries);
                            }
                        }
                        onDelete={
                            () => {
                                const newEntries = entries.slice();
                                newEntries.splice(index, 1);
                                setEntries(newEntries);
                            }
                        }
                        
                    />
                ))}
                </ul>
            </Row>
        </Container>
    )
}

function FormListElement(props){
    return (
        <Container fluid>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>{props.entryName}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        type="text" 
                        onChange={
                            (e) => {
                                props.onEntry(e.target.value);
                            }
                        }
                        value={props.entry}>
                        </FormControl>
                    </InputGroup>
                </Col>
                <Col>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={
                            () => {
                                props.onDelete();
                            }
                        }
                    >{`Delete ${props.entryName}`}</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default Profile;



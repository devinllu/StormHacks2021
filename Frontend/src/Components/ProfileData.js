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

function Profile({profileData}){

    const [profile, setProfile] = React.useState({   
        Name: profileData.Name,
        Contacts: profileData.Contacts.slice(),
        Games: profileData.Games.slice(),
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

    return (
        <div>
            <label> Name: </label>
            <h1>{profile.Name}</h1>
            <label> Contacts: </label>
            <ul>
            {profile.Contacts.map((contact, index) => (
                <li key={index}>{contact}</li>
            ))}
            </ul>
            <label> Games: </label>
            <ul>
            {profile.Games.map((game, index) => (
                <li key={index}>{game}</li>
            ))}
            </ul>
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
        <div>
            <div>
                <div>
                    <span >
                        Name
                    </span>
                </div>
                <input 
                    type="text" 
                    value={name}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                    >
                </input>
                </div>
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
                <button onClick={handleSubmit}>Apply Profile Changes</button>
            
        </div>
        
        
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
        <div>
            <div>
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
            </div>
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
        </div>
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



import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';


function Profile({profileData}){

    const [profile, setProfile] = React.useState({   
        Name: profileData.Name,
        Contacts: profileData.Contacts.slice(),
        Games: profileData.Games.slice(),
    })
    
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
            <button className="btn btn-primary" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#edit-profile">Edit Profile</button>
            <div 
                className="card card-body" 
                id="edit-profile">
                <EditProfileForm profileData={profileData} applyChanges={applyProfileChanges} />
            </div>
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
            <div className="input-group mb-3">
                <div class="input-group-prepend">
                    <span 
                        className="input-group-text">
                        Name
                    </span>
                </div>
                <input 
                    className="form-control"
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
            <div class="btn-group" role="options">
                <button 
                    onClick={addNewEntry}
                    className="btn btn-primary"
                >
                    {`Add new ${props.entryName}`}
                </button>
                <button 
                    onClick={submit}
                    className="btn btn-secondary"
                >
                    Confirm list changes
                </button>
            </div>
                <ul>
                {entries.map((item, index) => (
                    <li key={index}>
                        <input 
                            type="text" 
                            onChange={
                                (e) => {
                                    const newEntries = entries.slice();
                                    newEntries[index] = e.target.value;
                                    setEntries(newEntries);
                                }
                            }
                            value={item}
                        ></input>
                        <button 
                            onClick={
                                () => {
                                    const newEntries = entries.slice();
                                    newEntries.splice(index, 1);
                                    setEntries(newEntries);
                                }
                            }
                        >{`Delete ${props.entryName}`}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Profile;



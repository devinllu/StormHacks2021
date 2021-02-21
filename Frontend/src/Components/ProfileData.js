import React from 'react';


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
            <hr></hr>
            <EditProfileForm profileData={profileData} applyChanges={applyProfileChanges} />
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
            <form>
            <label>Name</label>
            <input 
                type="text" 
                value={name}
                onChange={e => {
                    setName(e.target.value);
                }}
                >
            </input>
            </form>
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
            <button onClick={addNewEntry}>
                {`Add new ${props.entryName}`}
            </button>
            <button onClick={submit}>
                Confirm list changes
            </button>
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



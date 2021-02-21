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
            <EditProfileForm profileData={profileData} applyChanges={applyProfileChanges} />
        </div>
        
    );
}

function EditProfileForm(props){
    
    const [profile, setProfile] = React.useState({
        Name: props.profileData.Name,
        Contacts: props.profileData.Contacts.slice(),
        Games: props.profileData.Games.slice(),
    });
    

    const handleSubmit = () => {
        props.applyChanges(profile);
    };

    return (
        <div>
            <form>
            <label>Name</label>
            <input type="text" onChange={e => {
                setProfile({
                    Name: e.target.value,
                })
                console.log(profile);
            }}></input>
            </form>
            <button onClick={handleSubmit}>Apply Profile Changes</button>
            <FormListComponent
                entryList={profile.Contacts.slice()}
                entry={""}
                entryName={"Contact"}
                applyChanges={
                    (newEntries) => {
                        setProfile({
                            Contacts: newEntries
                        })
                    }
                }
            />
        </div>
        
    )
}

// --- Custom Form List Component --- //
// @TODO entry is a string not an object, so we might need to watch out for that
function FormListComponent(props){
    
    const [entries, setEntries] = React.useState(props.entryList);
    const addNewEntry = () => {
        let newEntries = entries.slice();
        newEntries.push(props.entry);
        setEntries(newEntries);
    }
    return(
        <div>
            <button onClick={addNewEntry}>
                {`Add new ${props.entryName}`}
            </button>
            <ul>
                {entries.map((item, index) => (
                    <FormListElement 
                        key={index}
                        entry={item}  
                        deleteElement={() => {
                            const newEntries = entries.splice(index, 1);
                            setEntries(newEntries);
                        }}
                    />
                ))}
            </ul>
            <button
            onClick={() => props.applyChanges(entries)}>
                {"Submit changes"}
            </button>
        </div>
    )
}

//--- Holds each entry with button --- ///
function FormListElement(props){
    return(
        <li>
            <input type="text" value={props.entry}></input>
            <button onClick={() => props.deleteElement()}>{"Delete"}</button>
        </li>
    )
}

export default Profile;



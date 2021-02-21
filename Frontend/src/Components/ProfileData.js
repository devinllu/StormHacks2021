import React from 'react';


function Profile({profileData}){

    const [profile, setProfile] = React.useState({   
        Name: profileData.Name,
        Contacts: profileData.Contacts.slice(),
        Games: profileData.Games.slice(),
    })
    console.log(profileData);

    const applyProfileChanges = (profileData) => {
        setProfile({
            Name: profileData.Name,
            Contacts: profileData.Contacts.slice(),
            Games: profileData.Games.slice(),
        })
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
            <EditProfileForm profileData={profileData} applyChanges={applyProfileChanges}/>
        </div>
        
    );
}

function EditProfileForm({profileData}, {applyChanges}){
    
    const [profile, setProfile] = React.useState({
        Name: profileData.Name,
        Contacts: profileData.Contacts.slice(),
        Games: profileData.Games.slice(),
    });
    console.log(profileData.Contacts);

    const handleSubmit = () => {
        applyChanges(profileData);
    }

    return (
        <div>
            <form>
            <label>Name</label>
            <input type="text" onSubmit={e => {
                setProfile({
                    Name: e.target.value,
                })
                console.log(profile);
            }}></input>
            </form>
            {/*<FormListComponent
                entryList={profile.Contacts.slice()}
                entry={"ere"}
                entryName={"Contact"}
                applyChanges={
                    (newEntries) => {
                        setProfile({
                            Contacts: newEntries
                        })
                    }
                }
            /> */}
            <button onClick={()=>handleSubmit()}></button>
        </div>
        
    )
}

// --- Custom Form List Component --- //
// @TODO entry is a string not an object, so we might need to watch out for that
function FormListComponent({entryList}, {entry}, {entryName}, {applyChanges}){
    
    const [entries, setEntries] = React.useState(entryList);

    console.log("entryList" + entryList);
    console.log("entries" + entries);

    const addNewEntry = () => {
        let newEntries = entries.slice();
        newEntries.push(entry);
        setEntries(newEntries);
    }
    return(
        <div>
            <button onClick={addNewEntry()}>
                {`Add new ${entryName}`}
            </button>
            {entries.map((entryItem, index) => (
                <FormListElement 
                    entry={entryItem}  
                    deleteElement={() => {
                        const newEntries = entries.splice(index, 1);
                        setEntries(newEntries);
                    }}
                />
            ))}
            <button
            onClick={() => applyChanges(entries)}>
                {"Submit changes"}
            </button>
        </div>
    )
}

//--- Holds each entry with button --- ///
function FormListElement({entry}, {deleteElement}){
    return(
        <li>
            <div>
                <input type="text" value={entry}></input>
                <button onClick={() => deleteElement()} value={"Delete"}></button>
            </div>
        </li>
    )
}

export default Profile;



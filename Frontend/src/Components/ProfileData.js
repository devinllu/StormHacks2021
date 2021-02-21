import React from 'react';


function Profile(){

    const [name, setName] = React.useState("");
    const [contacts, setContacts] = React.useState([]);
    const [games, setGames] = React.useState([]);

    const applyProfileChanges = (profileData) => {
        console.log(profileData);
    }

    return (
        <div>
 
        </div>
    );
}

function EditProfileForm({profileData}, {applyChanges}){
    
    const [profile, setProfile] = React.useState({
        Name: profileData.Name,
        Contacts: profileData.Contacts.slice(),
        Games: profileData.Games.slice(),
    });

    const handleSubmit = (event) => {

    }

    return (
        <form>
            <label>Name</label>
            <input type="text" onSubmit={e => {
                setProfile({
                    Name: e.target.value,
                })
                console.log(profile);
            }}></input>
            <label>Contacts</label>
            <FormListComponent 
                entries={Contacts.slice()} 
                applyChanges={(newEntries) => {
                    setContacts(newEntries.slice());
                }}/>
            <label>Games</label>
        </form>
    )
}

// --- Custom Form List Component --- //
function FormListComponent(entries, entry, entryName, applyChanges){
    const [entries, setEntries] = React.set(entries);

    const addNewEntry = () => {
        setEntries(
            entries.concat([entry])
        )
    }

    return(
        <div>
            <button 
                onClick={addNewEntry}>
                {`Add new ${entryName}`}
            </button>
            {entries.map((entryItem, index)=> (
                <FormListElement 
                    entry={entryItem}  
                    index={}
                    deleteElement={() => {
                        const newEntries = entries.splice(index, 1);
                        setEntries(newEntries);
                    }}
                />
            ))}
        </div>
    )
}

//--- Holds each entry with button --- ///
function FormListElement(entry, index, deleteElement){
    return(
        <li>
            <div>

            </div>
        </li>
    )

}



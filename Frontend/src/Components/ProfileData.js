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
            <label>Games</label>
        </form>
    )
}

function FormListComponent(){

}



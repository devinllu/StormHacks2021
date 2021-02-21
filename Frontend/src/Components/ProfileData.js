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
    let profileCopy = JSON.parse(JSON.stringify(profileData));
    const [profile, setProfile] = React.useState(profileCopy);
    
    return (
        <form>

        </form>
    )
}



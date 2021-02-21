import React from 'react';

// @TODO refeactor Friend object
function Friend(name, dateMet, ...games){
    this.Name = name;
    this.DateMet = dateMet;
    this.GamesInCommon = games.slice();
}

function FriendElement({friend}) {
    return(
        <div>
            <hr></hr>
            <h1>{friend.Name}</h1>
            <h1>{friend.DateMet}</h1>
            <hr></hr>
        </div>
    )
}

function FriendForm({addFriend}){
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState("");
    const [games, setGames] = React.useState(["Halo"]);

    const verifyInput = (event) => {
        event.preventDefault();
        if(name !== "" && date !== "" && games.length > 0){
            const friend = new Friend(name, date, games);
            addFriend(friend);
            setName("");
            setDate("");
        }
        else {
            alert("One of the fields are empty!");
        }
    }
    
    return (
        <form>
            <label> Name </label>
            <input type="text" 
                    onChange={e => {setName(e.target.value)}}
                    value={name}>
            </input>
            <label> Date Met </label>
            <input type="text"
                    onChange={e => {setDate(e.target.value)}}
                    value={date}>
            </input>
            <input type="submit" value="Submit" onClick={verifyInput}></input>
        </form>
    )
}

function FriendList() {
    let firstFriend = new Friend(
        "George",
        "January 15, 2007",
        "Halo: Combat Evolved",
        "Bionicle"
    );
    const [friends, setFriends] = React.useState([
        firstFriend
    ])

    const addFriend = friend =>{
        const newFriends = [...friends, friend];
        setFriends(newFriends);
    }

    return (
        <div >
            {friends.map((friend, index) => 
                <FriendElement 
                    key={index}
                    index={index}
                    friend={friend}
                />
            )}
            <FriendForm addFriend={addFriend} />
        </div>
    );
}

export default FriendList;
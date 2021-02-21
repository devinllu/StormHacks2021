import React from 'react';

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
    const [friend, setFriend] = React.useState({
        friend: {}
    });

    return (
        <form>
            <label>Name</label>
            <input type="text"></input>
            <label>Date Met</label>
            <input type="text"></input>
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

    return (
        <div >
            {friends.map((friend, index) => 
                <FriendElement 
                    key={index}
                    index={index}
                    friend={friend}
                />
            )}
        </div>
    );
}

export default FriendList;
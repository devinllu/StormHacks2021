
// FireBase App configuration
let firebase = require('firebase/app');

// @TODO add necessary firebase applications
require('firebase/firestore');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy3sdApbseIZzpjiTFnV6ElXVJ6lYkDBI",
  authDomain: "stormhacks-2021.firebaseapp.com",
  projectId: "stormhacks-2021",
  storageBucket: "stormhacks-2021.appspot.com",
  messagingSenderId: "113741072595",
  appId: "1:113741072595:web:37594178973324449eec26",
  measurementId: "G-9VEXKCD8DL"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
const queries = require('./lib/queries.js')(db, firebase);

const express = require('express')
const path = require("path");
const { exception } = require('console');
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.post('/login', (req, res) => {
  queries.Login(req.body.profileObj.googleId, (status) => {
    if (status == 200) {
      res.sendStatus(200);
    } else if (status == 204) {
      queries.Register(req.body.profileObj, (status) => {
        res.sendStatus(status);
      });
    }
  });
})

app.get('/profile/:userid', (req, res) => {
  let userid = req.params.userid;
  queries.Profile(userid, (value) => {
    res.send(value);
  });
})

app.get('/profile/:userid/games', (req, res) => {
  queries.GamesPlayed(req.params.userid, (value) => {
    res.send(value);
  });
})

app.post('/profile', (req, res) => {
  queries.UpdateProfile(req.body.userId, req.body, (value) => {
    res.sendStatus(value);
  });
})

app.get('/game/:gameid', (req, res) => {
  queries.Game(req.params.gameid, (value) => {
    res.send(value);
  });
})

app.get('/games', (req, res) => {
  queries.Games((value) => {
    res.send(value);
  });
})

app.post('/addGame', (req, res) => {
  queries.AddGame(req.body.userId, req.body.gameId, (value) => {
    res.sendStatus(value);
  });
})

app.post('/sendFriendRequest', (req, res) => {
  queries.SendFriendRequest(req.body.senderId, req.body.receiverId, (value) => {
    res.sendStatus(value);
  });
})

app.post('/acceptFriendRequest', (req, res) => {
  queries.AcceptFriendRequest(req.body.senderId, req.body.receiverId, (value) => {
    res.sendStatus(value);
  });
})

app.post('/declineFriendRequest', (req, res) => {
  queries.DeclineFriendRequest(req.body.senderId, req.body.receiverId, (value) => {
    res.sendStatus(value);
  });
})

app.post('/deleteFriend', (req, res) => {
  queries.DeleteFriend(req.body.senderId, req.body.receiverId, (value) => {
    res.sendStatus(value);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
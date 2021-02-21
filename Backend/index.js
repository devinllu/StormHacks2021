
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

const express = require('express')
const path = require("path");
const { exception } = require('console');
const app = express()
const port = 5000

app.use(express.json())

// routes


// Andy Routes
// https://masteringjs.io/tutorials/express/route-parameters
app.get('/profiles/:userid', (req, res) => {
    // res.send(req.params);
    // I need the specific profile object back. 
})

app.post('/profiles/:userid', (req, res) => {
    // req would just replace the profile at userid.
    // res with status code i believe
})


app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.post("/users", (req, res) => {

  db.collection("Users").doc(req.body.profileObj.googleId).set({
    Name: req.body.profileObj.name
  })
  .then((querySnapshot) => {
    console.log("document written successfully")
  }).catch((exception) => {
    console.log("error");
    console.log(exception);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
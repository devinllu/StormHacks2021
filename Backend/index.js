
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

function testDb() {
  db.collection("Test").get().then((querySnapshot) => {
    querySnapshot.forEach((element) => {
      console.log(element.data());
    });
  }).catch((exception) => {
    console.log("error");
    console.log(exception);
  });
}

function testDB2() {
  db.collection("Test").doc("NewEntry").set({
    Name: "Devin",
    Age: 20
  })
  .then((querySnapshot) => {
    console.log("document written successfully")
  }).catch((exception) => {
    console.log("error");
    console.log(exception);
  });
}

testDB2();
testDb();



const express = require('express')
const path = require("path");
const { exception } = require('console');
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.post("/users", (req, res) => {
  // console.log(req.body.profileObj)

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
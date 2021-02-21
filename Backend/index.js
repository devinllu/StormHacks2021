
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
testDb();



const express = require('express')
const path = require("path");
const { exception } = require('console');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
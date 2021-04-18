const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var admin = require("firebase-admin");

var serviceAccount = require("./nkrikardbencic-117a7-firebase-adminsdk-lpuw5-efcf13c519.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nkrikardbencic-117a7.firebaseio.com"
});

const db = admin.firestore();

app.get('/getkarta', (request, response) => {
    let res = [];
    db.collection('karta')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let document = {
                    id: doc.id,
                    data: doc.data()
                }
                res.push(document)
            })
            return response.send(res)
        })
        .catch((error) => {
            return response.send("Error getting documents: ", error);
        })
})

app.get('/getnadolazeceutakmice', (request, response) => {
    let res = [];
    db.collection('nadolazeceUtakmice')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let document = {
                    id: doc.id,
                    data: doc.data()
                }
                res.push(document)
            })
            return response.send(res)
        })
        .catch((error) => {
            return response.send("Error getting documents: ", error);
        })
})

app.get('/getprosleutakmice', (request, response) => {
    let res = [];
    db.collection('prosleUtakmice')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let document = {
                    id: doc.id,
                    data: doc.data()
                }
                res.push(document)
            })
            return response.send(res)
        })
        .catch((error) => {
            return response.send("Error getting documents: ", error);
        })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
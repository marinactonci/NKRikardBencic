const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("./nkrikardbencic-117a7-firebase-adminsdk-lpuw5-efcf13c519.json");

var models = require('./models.js');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nkrikardbencic-117a7.firebaseio.com"
});

const db = admin.firestore();

app.get('/karta', async(request, response) => {
    let id = (
        typeof request.query.id !== 'undefined' ?
        request.query.id :
        null
    )
    let order = null
    let where = null
    if (id === null) {
        order = models.getOrder(request.query)
        where = models.getWhere(request.query)
    }
    models.get(db, 'karta', id, order, where)
        .then(res => {
            return response.send(res)
        }).catch((error) => {
            return response.send(error)
        })
})

app.get('/meteoStationSensor', async(request, response) => {
    if (typeof request.query.id === 'undefined') {
        let res = []
        db.collection('meteoStationSensor').get()
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
            .catch(function(error) {
                return response.send(
                    "Error getting documents: " + error
                )
            })
    } else {
        if (typeof request.query.subCollection === 'undefined') {
            let docRef = db
                .collection('meteoStationSensor')
                .doc(request.query.id)
            docRef.get()
                .then((doc) => {
                    if (typeof doc.data() !== 'undefined') {
                        let document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        return response.send(document)
                    } else {
                        let error = ("Error getting document " +
                            id +
                            ": The document is undefined"
                        )
                        return response.send(error)
                    }
                })
                .catch(function(error) {
                    return response.send(error)
                })
        } else {
            let res = []
            let cRef = db
                .collection('meteoStationSensor')
                .doc(request.query.id)
                .collection(request.query.subCollection)
            cRef.get()
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
                .catch(function(error) {
                    return response.send(
                        "Error getting documents " +
                        "of subcollection: " +
                        error
                    )
                })
        }
    }
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
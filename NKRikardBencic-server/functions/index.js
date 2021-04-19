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

app.post('/karta', (request, response) => {
    if (Object.keys(request.body).length) {
        db.collection('karta').doc().set(request.body)
            .then(function() {
                return response.send(
                    "Document successfully written - created!"
                )
            })
            .catch(function(error) {
                return response.send(
                    "Error writing document: " + error
                )
            })
    } else {
        return response.send(
            "No post data for new document. " +
            "A new document is not created!"
        )
    }
})

app.put('/karta', (request, response) => {
    if (Object.keys(request.body).length) {
        if (typeof request.query.id !== 'undefined') {
            db.collection('karta')
                .doc(request.query.id)
                .set(request.body)
                .then(function() {
                    return response.send(
                        "Document successfully written - " +
                        "updated!"
                    )
                })
                .catch(function(error) {
                    return response.send(
                        "Error writing document: " + error
                    )
                })
        } else {
            return response.send(
                "A parameter id is not set. " +
                "A document is not updated!"
            )
        }
    } else {
        return response.send(
            "No post data for new document. " +
            "A document is not updated!"
        )
    }
})

app.delete('/karta', (request, response) => {
    if (typeof request.query.id !== 'undefined') {
        db.collection('karta').doc(request.query.id).delete()
            .then(function() {
                return response.send(
                    "Document successfully deleted!"
                )
            })
            .catch(function(error) {
                return response.send(
                    "Error removing document: " + error
                )
            })
    } else {
        return response.send(
            "A parameter id is not set. " +
            "A document is not deleted!"
        )
    }
})

app.get('/prosleUtakmice', async(request, response) => {
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
    models.get(db, 'prosleUtakmice', id, order, where)
        .then(res => {
            return response.send(res)
        }).catch((error) => {
            return response.send(error)
        })
})

app.post('/prosleUtakmice', (request, response) => {
    if (Object.keys(request.body).length) {
        db.collection('prosleUtakmice').doc().set(request.body)
            .then(function() {
                return response.send(
                    "Document successfully written - created!"
                )
            })
            .catch(function(error) {
                return response.send(
                    "Error writing document: " + error
                )
            })
    } else {
        return response.send(
            "No post data for new document. " +
            "A new document is not created!"
        )
    }
})

app.put('/prosleUtakmice', (request, response) => {
    if (Object.keys(request.body).length) {
        if (typeof request.query.id !== 'undefined') {
            db.collection('prosleUtakmice')
                .doc(request.query.id)
                .set(request.body)
                .then(function() {
                    return response.send(
                        "Document successfully written - " +
                        "updated!"
                    )
                })
                .catch(function(error) {
                    return response.send(
                        "Error writing document: " + error
                    )
                })
        } else {
            return response.send(
                "A parameter id is not set. " +
                "A document is not updated!"
            )
        }
    } else {
        return response.send(
            "No post data for new document. " +
            "A document is not updated!"
        )
    }
})

app.delete('/prosleUtakmice', (request, response) => {
    if (typeof request.query.id !== 'undefined') {
        db.collection('prosleUtakmice').doc(request.query.id).delete()
            .then(function() {
                return response.send(
                    "Document successfully deleted!"
                )
            })
            .catch(function(error) {
                return response.send(
                    "Error removing document: " + error
                )
            })
    } else {
        return response.send(
            "A parameter id is not set. " +
            "A document is not deleted!"
        )
    }
})

app.get('/nadolazeceUtakmice', async(request, response) => {
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
    models.get(db, 'nadolazeceUtakmice', id, order, where)
        .then(res => {
            return response.send(res)
        }).catch((error) => {
            return response.send(error)
        })
})

app.post('/nadolazeceUtakmice', (request, response) => {
    if (Object.keys(request.body).length) {
        db.collection('nadolazeceUtakmice').doc().set(request.body)
            .then(function() {
                return response.send(
                    "Document successfully written - created!"
                )
            })
            .catch(function(error) {
                return response.send(
                    "Error writing document: " + error
                )
            })
    } else {
        return response.send(
            "No post data for new document. " +
            "A new document is not created!"
        )
    }
})

app.put('/nadolazeceUtakmice', (request, response) => {
    if (Object.keys(request.body).length) {
        if (typeof request.query.id !== 'undefined') {
            db.collection('nadolazeceUtakmice')
                .doc(request.query.id)
                .set(request.body)
                .then(function() {
                    return response.send(
                        "Document successfully written - " +
                        "updated!"
                    )
                })
                .catch(function(error) {
                    return response.send(
                        "Error writing document: " + error
                    )
                })
        } else {
            return response.send(
                "A parameter id is not set. " +
                "A document is not updated!"
            )
        }
    } else {
        return response.send(
            "No post data for new document. " +
            "A document is not updated!"
        )
    }
})

app.delete('/nadolazeceUtakmice', (request, response) => {
    if (typeof request.query.id !== 'undefined') {
        db.collection('nadolazeceUtakmice').doc(request.query.id).delete()
            .then(function() {
                return response.send(
                    "Document successfully deleted!"
                )
            })
            .catch(function(error) {
                return response.send(
                    "Error removing document: " + error
                )
            })
    } else {
        return response.send(
            "A parameter id is not set. " +
            "A document is not deleted!"
        )
    }
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
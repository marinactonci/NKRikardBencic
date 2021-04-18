module.exports = {
    get: async function(db, collection, id, order) {
        let res = []
        if (id === null) {
            if (order.orderAttr === null) {
                var collectionRef = db.collection(collection)
            } else {
                var collectionRef = db.collection(collection)
                    .orderBy(order.orderAttr, order.orderType)
            }
            return collectionRef.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        res.push(document)
                    })
                    return Promise.resolve(res)
                })
                .catch((error) => {
                    return Promise.reject(error)
                })
        } else {
            var docRef = db.collection(collection).doc(id)
            return docRef.get()
                .then((doc) => {
                    if (typeof doc.data() !== 'undefined') {
                        let document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        return Promise.resolve(document)
                    } else {
                        let error = (
                            "Error getting document " +
                            id +
                            ": The document is undefined"
                        )
                        return Promise.reject(error)
                    }
                })
                .catch(function(error) {
                    return Promise.reject(error)
                })
        }
    },
    getOrder: function(requestQuery) {
        let order = {
            orderAttr: (
                typeof requestQuery.orderAttr !== 'undefined' ?
                requestQuery.orderAttr :
                null
            ),
            orderType: (
                typeof requestQuery.orderDesc !== 'undefined' ?
                'desc' :
                'asc'
            )
        }
        return order
    },
    getWhere: function(requestQuery) {
        let where = null
        if (
            typeof requestQuery.whereAttr !== 'undefined' &&
            typeof requestQuery.whereOp !== 'undefined' &&
            typeof requestQuery.whereVal !== 'undefined'
        ) {
            let op = '=='
            if (requestQuery.whereOp === 'eq') { op = '==' } else if (requestQuery.whereOp === 'gt') { op = '>' } else if (requestQuery.whereOp === 'ge') { op = '>=' } else if (requestQuery.whereOp === 'lt') { op = '<' } else if (requestQuery.whereOp === 'le') { op = '<=' } else if (requestQuery.whereOp === 'ne') { op = '!=' } else if (requestQuery.whereOp === 'array-contains') {
                op = 'array-contains'
            } else if (
                requestQuery.whereOp === 'array-contains-any'
            ) {
                op = 'array-contains-any'
            } else if (requestQuery.whereOp === 'in') { op = 'in' } else if (requestQuery.whereOp === 'not-in') {
                op = 'not-in'
            }
            where = {
                attr: requestQuery.whereAttr,
                op: op,
                val: requestQuery.whereVal
            }
            return where
        }
    },
    getCollectionRef: function(db, collection, order, where) {
        var collectionRef = this.getCollectionRef(db, collection, order, where);
        console.log(where)
        if (order.orderAttr === null) {
            if (where && where.attr && where.op && where.val) {
                collectionRef = db.collection(collection)
                    .where(where.attr, where.op, where.val)
            } else {
                collectionRef = db.collection(collection)
            }
        } else {
            if (where && where.attr && where.op && where.val) {
                collectionRef = db.collection(collection)
                    .where(where.attr, where.op, where.val)
                    .orderBy(order.orderAttr, order.orderType)
            } else {
                collectionRef = db.collection(collection)
                    .orderBy(order.orderAttr, order.orderType)
            }
        }
        return collectionRef
    }
}
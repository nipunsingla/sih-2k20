const firebase = require('firebase-admin')
const jwt = require('../utils/jwt')
const shortid = require('shortid')
var db = firebase.firestore();

var authority = db.collection('authority')

const addCriminal = (obj, res) => {


    if (obj.name && obj.mark && obj.status) {
       /* authority = db.ref('/authority/' + obj.username)
        authority = authority.child(obj.id);
        authority.update(obj, (err, doc) => {
            if (err) {

                res.json({ "msg": "error" });
            }
            else {
                res.json({ "status": "200", "data": doc })
            }
        })*/
        authority.add(obj)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    else {
        res.json({ "msg": "something is not filled" })
    }
}
const getCriminal = (username, res) => {
    console.log(username)
    if (username == undefined) {
        return res.json({ "msg": "no user is present login first" })
    }
    /*
    authority = db.ref('/authority/' + username);
    authority.once('value', (snap) => {

        var results = Object.keys(snap.val()).map((key) => {
            console.log(snap.val()[key])
            return snap.val()[key]
        }
        )
        if (results) {
            res.json({ "data": snap.val() })
        }
        else {
            res.json({ "msg": "no records" })
        }
    })*/

    authority.where("username","==",username)
    .get()
    .then((query)=>{
        let results=[];
        query.forEach((doc)=>{
            results.push(doc.data())
        })
        res.json({"data":results});
    })
    .catch((err)=>{
        res.json({"err":err});
    })
}
module.exports = {
    addCriminal, getCriminal
}

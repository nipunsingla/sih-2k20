const firebase =require('firebase-admin')
const jwt=require('../utils/jwt')
const shortid=require('shortid')
var db=firebase.database();

var authority=db.ref('authority')

const addCriminal=(obj,res)=>{
    if(obj.name && obj.mark && obj.status){
      authority=db.ref('/authority/'+obj.username)
        authority=authority.child(obj.id);
        authority.update(obj,(err,doc)=>{
            if(err){
                res.json({"msg":"error"});
            }
            else{
                res.json({"status":"200","data":doc})
            }
        })
    }
    else{
        res.json({"msg":"something is not filled"})
    }
}
const getCriminal=(username,res)=>{
    console.log(username)
    authority=db.ref('/authority/'+username);
    authority.once('value',(snap)=>{
        
       var results=Object.keys(snap.val()).map((key)=>snap.val()[key])
        if(results){
            res.json({"data":snap.val()})
        }
       else{
           res.json({"msg":"no records"})
       }
   })
}
module.exports={
    addCriminal,getCriminal
}

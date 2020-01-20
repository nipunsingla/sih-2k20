const firebase =require('firebase-admin')
const jwt=require('../utils/jwt')

const service = require('../utils/service.json');
var firebaseadmin = firebase.initializeApp({
  credential: firebase.credential.cert(service),
  databaseURL: "https://security-service-f7f7e.firebaseio.com",
  storageBucket:"security-service-f7f7e.appspot.com"
})

var db=firebase.database();

var authority=db.ref('authority')
const login=(obj,res)=>{
    if(obj.username && obj.password && obj.email && obj.location){
        console.log('body in object',obj)
        authority=authority.child(obj.username)
        authority.once('value',(snap)=>{
            if(snap.val()){
                if(snap.val().password==obj.password){
                    var token=jwt.generateToken(obj.username)
                    authority.update({"token":token});
                    res.json({
                        "token":token,
                        "status":200,
                        "username":obj.username,
                        "email":obj.email
                    }); 
                    
                }
                else{
                    res.status(402).json({"msg":"incorrect password"});
                }
            }
            else{
                res.json({"status":"402","msg":"id does not exist"})
            }
        })
    }
};
const logout=(obj,res)=>{
    authority=authority.child(obj.username)
    authority.update({"token":""})
    res.json({"msg":"logged out"});
}
const operation={
    login,logout
}
module.exports=operation
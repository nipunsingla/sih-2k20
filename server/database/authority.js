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
    //console.log(obj.username, " ", obj.password, " ", obj.email, " ", obj.location)
    if(obj.username && obj.password && obj.email && obj.location){
        authority=authority.child(obj.username)
        authority.once('value',(snap)=>{
            if(snap.val()){
                //console.log(obj.password, " ", snap.val().password)
                if(snap.val().password===obj.password){
                    
                    var token=jwt.generateToken(obj.username)
                    authority.update({"token":token});
                    return res.status(200).json({
                        "token":token,
                        "username":obj.username,
                        "email":obj.email,
                        
                    }); 
                }
                else{
                    return res.status(402).json({"msg":"incorrect password"});
                }
            }
            else{
                return res.status(402).json({"msg":"id does not exist"})
            }
        })
    }
    else{
        return res.status(402).json({"msg" : "  id not found"})
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
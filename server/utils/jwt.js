const jwt = require('jsonwebtoken');
const jwtOperations = {
    SECRETKEY:'UCANTSEEME',
    generateToken(username){
        var token = jwt.sign({username }, this.SECRETKEY);//,{ expiresIn: '1h' });
        return token;
    },
    verifyToken(clientTokenNumber){
        var decoded = jwt.verify(clientTokenNumber, this.SECRETKEY);
        if(decoded){
        console.log('Verified ',decoded.username);
        return decoded.username;
        }
        else{
            console.log('Token Not Matched...');
            return undefined;
        }
    }
}
module.exports = jwtOperations;
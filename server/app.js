const express=require('express');
var bodyParser = require('body-parser');
const cors=require('./utils/cors')


const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors);
app.use(express.static('./public'));
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index');
})
app.use('/login',require('./routes/authority'));


app.listen(process.env.PORT||3001,()=>{
    console.log("Server Started, Browse to port no 3001...");
})
const express=require('express')
const router=express.Router();
const operation=require('../database/authority');
const criminal=require('../database/criminal')
const firebase=require('firebase-admin');
const Multer=require('multer');
const cloudStorageCtrl = require('../utils/cloudstorage');
const service=require('../utils/service.json')

const middle=require('../utils/middleware')
var bucket = firebase.storage().bucket();

router.use(function(req, res, next) {
    if (!req.firebase) {
      req.firebase = firebase;
    }
    if (!req.bucket) {
      req.bucket = bucket;
    }
    next();
  });

  const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: { 
      fileSize: 100 * 1024 * 1024
    }
  });
router.post('/add_criminal',multer.single('file'),cloudStorageCtrl.upload);

router.post('/',(req,res)=>{
    operation.login(req.body,res);
})

router.get('/add_criminal',(req,res)=>{
    res.render('add_criminal',{username:req.body.username})
})
router.get('/get_criminal',(req,res)=>{
    criminal.getCriminal('abc',res)
})

module.exports=router
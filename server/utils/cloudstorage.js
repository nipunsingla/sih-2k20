var criminal = require('../database/criminal')
var shortid = require('shortid')
exports.upload = (req, res) => {

  console.log("Req body is file", req.body);
  console.log("req file", req.file);
  let file = req.file;
  let extname = file.originalname.split('.')[1];
  console.log(extname)
  var obj = {

    id: req.body.username + shortid.generate(),
    username: req.body.username,
    name: req.body.name,
    mark: req.body.mark,
    status: req.body.status
  }

  data = JSON.parse(JSON.stringify(obj));
  criminal.addCriminal(obj, res);
  //let file = req.file;
  if (!file) {
    res.status(500);
    res.json('file not found');
    return;
  }
  //    let extname=file.originalname.split('.')[1];
  let fileUpload = req.bucket.file(obj.id + "." + extname);
  /*
 req.bucket.upload("assets/avatar/5ce7f5c25958b012805bb4f3_Logo-100-1.jpg").then(   //<-- if we have to upload local file, pass path of that file
*/
  // Get File from request Form data.
  fileUpload.save(new Buffer(req.file.buffer)).then(
    result => {
      console.log("file uploaded sucessfully");
      res.status(200).json({"msg":"successfully added"})
      //  res.status(200);
      //  res.json('file uploaded successfully');
    },
    error => {
      res.status(500);
      console.log(error);
      res.json({ error: error });
    }
  );
};
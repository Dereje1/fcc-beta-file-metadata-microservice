'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require('multer');
const upload = multer().any('upfile');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', (req, res)=>{
    upload(req, res, (err)=> {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.json({"Multer error": err})
    } else if (err) {
      // An unknown error occurred when uploading.
      res.json({"Unknown error": err})
    }else{
      res.json({"file name": req.files[0].originalname, "size": req.files[0].size,})
    }
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

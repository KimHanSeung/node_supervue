const express = require('express');
const Image = require('../models/image');
const fs = require('fs')
const multer = require('multer');
const router = express.Router();
 
var storage = multer.diskStorage({
  // 서버에 저장할 폴더
  destination: function (req, file, cb) {
      cb(null, './public/static/upload')
  },
  // 서버에 저장할 파일 명
  filename: function (req, file, cb) {
      cb(null, + Date.now() + '-' + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
 
//upload image
router.post('/upload/', upload.any(),(req, res, next) => {
  const newImage=new Image({
    path:req.files[0].path,
    originalname:req.files[0].originalname,
    mimetype: req.files[0].mimetype,
    filename:  req.files[0].filename
  })
  Image.addImage(newImage)
  .then(result => {
    // res.status(200).send('file upload finish')
    res.redirect('http://localhost:8080/file')
  })
  .catch((err) => {
    res.status(500).send('error occur in server')
  });
});

// To get all the files
router.get('/list', function (req, res) {
    Image.getImages({})
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err)
        });
});

router.get('/streaming/:id', function (req, res) {
    Image.getImageById(req.params.id)
        .then((image) => {
            res.writeHead(200, {'Content-Type':'video/mp4'})
            var file = __dirname + '/../' + image.path
            var rs = fs.createReadStream(file)
            rs.pipe(res)
        }).catch((err) => {
        res.status(500).send('error occur in server')
    });
});

module.exports = router;

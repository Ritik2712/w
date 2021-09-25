const ObjectId = require("mongodb").ObjectId
const { User } = require("../Models/userModel")
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream'); 
const GridFsStorage = require('multer-gridfs-storage');

let gfs

const PhotoServer=(conn)=>{
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
}


const uploadFile= async (req,res)=>{
  console.log("file uloaded");
}

const getFiles = (req,res)=>{
     //console.log(gfs);
        gfs.files.find().toArray((err, files) => {
          // Check if files
          if (!files || files.length === 0) {
            return res.status(404).json({
              err: 'No files exist'
            });
          }
      
          // Files exist
          return res.json(files);
        });
       // res.send("hello world from files")
}

const getFile = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
};

module.exports = {
    getFiles,
    uploadFile,
    PhotoServer
}



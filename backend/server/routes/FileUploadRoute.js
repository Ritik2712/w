const express = require("express")
const router = express.Router()
const { getFiles,uploadFile } = require("../Controllers/FileController")
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const {authUSer}= require('../middleWare/auth');
const { User } = require('../Models/userModel')
const ObjectId = require("mongodb").ObjectId


const storage = new GridFsStorage({
    url: process.env.DATABASE_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + file.originalname;
            const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
            };
            if(req.user){
                 User.updateOne(
                    {"_id":ObjectId(req.user._id)},
                    {"$set":{"img":filename}},
                    (err,res)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(res);
                        }
                    }
                )
                resolve(fileInfo);
            }else{
                resolve()
            }
            
        });
        });
    }
    });
    const upload = multer({ storage });



router.post('/upload',[authUSer,upload.single("file")],uploadFile)
router.get('/files',getFiles)
router.get('/image/:filename',()=>{})

module.exports = {
    routes:router
}
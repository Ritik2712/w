const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const { PhotoServer } = require("./server/Controllers/FileController");

const app = express();
const path = require("path")
require('dotenv').config();


//Connecting to mongodb databse
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then((res)=>console.log("Connected to DB"))
.catch((err)=> console.log(err))

//Photo UPload Server
const conn = mongoose.connection

conn.once('open', () => {
  PhotoServer(conn)
});

//Getting Routes
const userRoutes = require("./server/routes/userRouter")
const boardRoutes = require("./server/routes/boardRoute")
const listRoutes = require("./server/routes/listRoutes")
const cardRoutes = require("./server/routes/cardRoutes");
const fileRoute = require("./server/routes/FileUploadRoute")

app.use(cors());
app.use(express.json());


app.use('/api', userRoutes.routes)
app.use('/api', boardRoutes.routes)
app.use('/api', listRoutes.routes)
app.use('/api', cardRoutes.routes)
app.use('/api', cardRoutes.routes)
app.use('/api',fileRoute.routes)

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, '/front/build')));
    
    app.get('/*', (req, res)=>{
      res.sendFile(path.join(__dirname , '/front/build/', 'index.html'))
    })
};


const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`server running:${port}`);
});


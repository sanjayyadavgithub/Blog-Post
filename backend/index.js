const express = require('express');
const mongoose = require('mongoose');
const UserRoute = require('./route/user');
const BlogRoute = require("./route/blog")
const cors = require('cors')
const app = express();
const uri = "mongodb://127.0.0.1:27017/blogs"

app.use(cors())
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error);
  });
app.use(express.json());

app.use('/api/user',UserRoute);
app.use("/api/blog",BlogRoute)
app.use("/api",(req,res)=>{
  res.send({msg:"successfully working"})
})

app.listen(8800,()=>{
    console.log("Server running on port number")
})
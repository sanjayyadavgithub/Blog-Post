const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})


module.exports = new mongoose.model("Blog",blogSchema)
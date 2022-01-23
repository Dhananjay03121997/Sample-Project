const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    originalName:{
        type:String,
        require:true
    },
    fileName:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    }
});
const image = mongoose.model('image', schema);
module.exports = image;
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect( "mongodb+srv://Dhananjay:0000@cluster0.ptc5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{});

//localDatabase
// mongoose.connect(`mongodb://127.0.0.1:27017/Sample-Project`,{});
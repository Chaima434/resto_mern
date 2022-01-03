const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fooditemSchema = new Schema({
    link:{
        type : String,
        required : true
    },
    name:{
        type : String
    },
    
    price:{
        type : String
    }
    ,
    
    details:{
        type : String
    },
});

module.exports = mongoose.model('Fooditems',fooditemSchema);
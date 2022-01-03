const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    
    name :{
        type : String,
        required : true
    },
    link : {
        type : String, 
        required : true
    },
    location : {
        type : String, 
        required : true
        
    },
    city:{
        type : String, 
        required : true

    }

});

module.exports  = mongoose.model('restaurants',RestaurantSchema);
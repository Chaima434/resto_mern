const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    order: [{
        
        food_id : String, 
        quantity : String,
        name : String,
        price : String
        }
    ],
    user_id : String,
    restaurant_id : String,
    restaurant_name : String,
    createdOn:{
        type: Date,
        default : Date.now
    }
})



module.exports  = mongoose.model('orders',OrderSchema);
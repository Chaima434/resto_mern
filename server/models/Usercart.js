const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsercartSchema = new Schema({
    user_id : {
        type: String,
        required : true
    },
    cart :  [
                {
                    _id : String,
                    link: String,
                    name : String,
                    price : String,
                    quantity : Number
                }
            ],
            
    
});

module.exports = mongoose.model('usercart',UsercartSchema);
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// const db_URI = ``;

const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
    useNewUrlParser :true 
  };
  
  mongoose.connect("https://localhost:27017/my_resto", options).then(
    () => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
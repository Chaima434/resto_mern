const express = require('express');
const app = express()
const port = 3200;
const cors = require('cors');



require('dotenv').config();
require("./config/db");
const authenticate = require('./authentication');
app.use(cors({
  exposedHeaders: ['auth-token'],
}));
app.use(express.json({
    type: ['application/json', 'text/plain']
  })) // for parsing application/json
app.use(authenticate);

app.listen(port,()=> {
    console.log(`Listening on port ${port}`);
})
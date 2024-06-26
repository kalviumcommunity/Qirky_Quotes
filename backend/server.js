const express = require('express');
const app = express();
const mongoose = require('mongoose');
const app_routes = require('./routes')
const cors = require('cors')

const{startDatabase}=require('./db')
app.use(cors())



app.use('/', app_routes);


app.listen(3000, () => {
    startDatabase();
    console.log('Server running on port 3000');
    
});

module.exports = app;
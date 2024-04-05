const express = require('express');
const app = express();
const port = process.env.PUBLIC_PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.URI;
let connectionStatus = 'Disconnected'
const mongoose = require('mongoose')

const startDatabase = async()=>{
  try{
    await mongoose.connect(URI)
    connectionStatus = 'Connected';
  }catch(err){
    console.error('Failed Connection',err)
    connectionStatus = 'Failed';
  }
}

// define the ping route
app.get('/ping',(req,res)=>{
  res.send('pong');
});

app.get('/',async(req,res)=>{
  try{
    await mongoose.connect(URI) 
    res.send(connectionStatus)
  }catch(error){
    console.error("Failed to connect",error)
  }
  
})

if (require.main === module) {
  app.listen(port, () => {
    startDatabase();
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
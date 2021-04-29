const express = require('express')
const bodyParser = require('body-parser');
const albumRoutes = require('./routes/albums');
const pictureRoutes = require('./routes/pictures');
const mongoose = require('mongoose');
const keys = require('./keys');


const app = express();

mongoose.connect(`mongodb+srv://wojwoj:1234@testingcluster.rgayz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        console.log('connected')
    })
    .catch(() =>{
        console.log('nope')
    })

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      'Access-Control-Allow-Credentials', 'true'
    )
    next();
})

app.use('/api/albums',albumRoutes);
app.use('/api/pictures',pictureRoutes);

module.exports = app;
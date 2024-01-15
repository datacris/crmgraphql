const mongoose = require("mongoose")
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
           useNewUrlParser: true,
           useUnifiedTopology: true
        });
        console.log('Mongo DB Connected')
        console.log('******************************************')
    }
    catch(error){
        console.log('DB Errror connection: ', error)
        // process.exit(1); stops the app
    }
}
module.exports = conectarDB;

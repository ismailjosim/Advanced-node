const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
require('colors');

const MONGODB_URL = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.s9x13go.mongodb.net/natours?retryWrites=true&w=majority`
// const MONGODB_URL = process.env.LOCAL_DATABASE;


// database connection
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URL);
        console.log("Mongo Database Connected Successfully!".bgBlue.bold.italic);
    } catch (error) {
        console.error(error);
    }

}


module.exports = dbConnect;

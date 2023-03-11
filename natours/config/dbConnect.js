const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
require('colors');

// const MONGODB_URL = process.env.LOCAL_DATABASE
const MONGODB_URL = process.env.MONGODB_URL;


const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URL);
        console.log(`Mongodb Connected On Port: ${ connect.connection.host }`.bgBlue.bold.italic);
    } catch (error) {
        console.error(error);
    }

}


module.exports = dbConnect;

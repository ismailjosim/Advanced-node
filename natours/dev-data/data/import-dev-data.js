const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('colors');
dotenv.config();

const Tour = require('../../models/tourModel')


// database connection
const MONGODB_URL = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.s9x13go.mongodb.net/natours?retryWrites=true&w=majority`

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URL);
        console.log("Mongo Database Connected Successfully!".bgBlue.bold.italic);
    } catch (error) {
        console.error(error);
    }

}
dbConnect()

// Read JSON File
const tours = JSON.parse(fs.readFileSync(`${ __dirname }/tours-simple.json`, 'utf-8'))

// import data into db
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Imported');

    } catch (err) {
        console.log(err);
    }
    process.exit();
}


// DELETE ALL PREVIOUS COLLECTION FROM DB
const deleteAllData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Deleted successfully');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
    console.log('Data Imported');

} else if (process.argv[2] === '--delete') {
    deleteAllData();
    console.log('Data Deleted successfully');
}


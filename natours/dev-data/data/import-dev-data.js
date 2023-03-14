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
        // await Tour.deleteMany({}); // it's first delete the previous data that already exist in database.
        await Tour.create(tours);// then add data from JSON file. see the below function.
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

// write this command to Add Data from JSON File: node dev-data/data/import-dev-data.js --import
// write this command to remove previous all data from DB: node dev-data/data/import-dev-data.js --delete
// process.exit(); this method is use to forcefully exit the application. since we use the above the code once so it would not be a problem.

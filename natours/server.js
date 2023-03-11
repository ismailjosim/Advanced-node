const dotenv = require('dotenv');
dotenv.config();
require('colors')


const app = require('./app');
const dbConnect = require('./config/dbConnect');


const port = process.env.PORT || 5000;

// database connection
dbConnect();




app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`.bgCyan.italic.bold);
});

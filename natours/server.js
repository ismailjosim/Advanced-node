
const dotenv = require('dotenv');
dotenv.config();
require('colors')

// Require Our Own Files
const app = require('./app');
const dbConnect = require('./config/dbConnect');
const port = process.env.PORT || 5000;

// database connection
dbConnect();


// Run Server: and Listen to the port
app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`.bgCyan.italic.bold);
});

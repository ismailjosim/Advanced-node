const app = require('./app')

const port = 5000;

app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`);
});

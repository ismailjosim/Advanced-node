const fs = require('fs');
const server = require('http').createServer();


server.on('request', (req, res) => {


    // solution 01
    // fs.readFile('test-file.txt', (error, data) => {
    //     if (error) console.log(error);
    //     res.end(data)
    // })

    // solution 02: using streams
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })

    // // when reading is ended
    // readable.on('end', () => {
    //     res.end();
    // });

    // // error handling
    // readable.on('error', error => {
    //     console.log(error);
    //     res.statusCode(500)
    //     res.end("File not found");
    // });


    // solution 03: using the pipe operator
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);

    // readable source file.pipe(writeableDestination): in our case res is our destination.

});


server.listen(5000, '127.0.0.1', () => {
    console.log("Listen to the server!");
});
//====> How node js module system works behind the scenes
/*
Now How does node know which file to load when we require a module?
because we know we can load 3 different kinds of modules:
1. core module
2. our own module
3. 3rd party module(from NPM)





*/

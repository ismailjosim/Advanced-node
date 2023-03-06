const fs = require('fs'); // fs stands for file system;
const http = require('http')
const url = require('url');


//==========> FILE SYSTEM

// Blocking, synchronous way
/*
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textInput);

// Write file
const textOut = `This is what we know about the avocado: ${ textInput }\nCreate on ${ Date.now() }`

fs.writeFileSync('./txt/output.txt', textOut)
// console.log("File Write successfully!");

//  asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    const readData = data1;
    fs.readFile(`./txt/${ readData }.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
    })

})
console.log("Welcome to the Node Concept!");
*/
//==========> SERVER

const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);



//===> create the server
const server = http.createServer((req, res) => {
    const pathName = req.url;


    if (pathName === '/about') {
        res.end("You're Now in about Route")
    }

    else if (pathName === '/' || pathName === '/home') {
        res.end("You're Now in Home Route")
    }

    // Read file data from filesystem
    else if (pathName === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.send(dataObj)
    }


    else {
        res.writeHead(404, {
            'content-type': 'text/html'
        })
        res.end("<h1>The page in not found!</h1>")
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Listening to request on port 5000");
})

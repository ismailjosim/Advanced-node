const fs = require('fs'); // fs stands for file system;
const http = require('http')


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

//===> create the server
const server = http.createServer((req, res) => {
    // console.log(req);
    res.end('Hello From the Server!')
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Listening to request on port 5000");
})

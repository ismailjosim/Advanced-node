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

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;

}


const tempOverview = fs.readFileSync(`${ __dirname }/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${ __dirname }/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${ __dirname }/templates/template-product.html`, 'utf-8');

// Read Product Data from data.json file.
const productData = fs.readFileSync(`${ __dirname }/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(productData)



//===> create the server
const server = http.createServer((req, res) => {
    const pathName = req.url;

    // about page
    if (pathName === '/about') {
        res.end("You're Now in about Route")
    }
    // overview page
    else if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' })
        const cardHTMl = dataObj.map(item => replaceTemplate(tempCard, item)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHTMl)
        res.end(output);
    }

    // API page
    else if (pathName === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(dataObj)
    }

    // 404 page
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

const fs = require('fs');
const crypto = require('crypto');

//===> Set Timeout for event loop checking
const start = new Date();


fs.readFile('test-file.txt', 'utf-8', () => {
    console.log("I/O finished!");

    setTimeout(() => {
        console.log("Timer 1 is finished!");

    }, 0);
    setTimeout(() => {
        console.log("Timer 2 is finished!");

    }, 3000);

    setImmediate(() => {
        console.log("Timer 3 is finished!");
    });

    process.nextTick(() => console.log("process nextTick finished!"));

    crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encryption finished!");
    })

    crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encryption finished!");
    })

    crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encryption finished!");
    })


    crypto.pbkdf2("password", 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, "Password encryption finished!");
    })
})

console.log("Hello from the top level code!");


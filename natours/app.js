const express = require('express');


const app = express();
const port = 5000;


//==> Default end point
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Natours server Connected 🎉🎉'
    });
});

//===> Get All reviews
app.post('/', (req, res) => {
    res.send("You can post to this input");
})





app.listen(port, () => {
    console.log(`Natours server running on Port: ${ port }`);
});

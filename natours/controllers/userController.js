const fs = require('fs');

//====> 02) All Required files
const users = JSON.parse(fs.readFileSync(`${ __dirname }/../dev-data/data/users.json`));


//====> 03) All functions
exports.getAllUsers = (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users: users
            }
        })
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

exports.createUser = (req, res) => {
    try {
        const newId = users[users.length - 1].id + 1;
        const newUser = Object.assign({ id: newId }, req.body);
        users.push(newUser);
        fs.writeFile(`${ __dirname }/dev-data/data/users.json`, JSON.stringify(users), err => {
            res.status(201).json({
                status: "success",
                data: {
                    user: newUser
                }
            })
        });
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }




}

exports.getSingleUser = (req, res) => {
    try {

    } catch (error) {

    }

}

exports.updateUser = (req, res) => {
    try {

    } catch (error) {

    }

}

exports.deleteUser = (req, res) => {
    try {

    } catch (error) {

    }

}

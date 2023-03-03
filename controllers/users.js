const User = require("../models/user");
const { response } = require("express");
module.exports.getUsers = (req, res) => {
    User.find({})
        .orFail()
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Error', err }));
};

module.exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById({ _id: req.params._id }).orFail(() => {
            const error = new Error("No user found with that id");
            error.statusCode = 404;
            throw error;
        });
        res.send(user);
    } catch (error) {
        console.log('Error happend in getUser', error)
        res.status(500).send('not found');
    }
}
module.exports.createUser = async(req, res) => {
    try {
        const newUser = await User.create(req.body)

        if (!newUser) {
            res.status(400).send('invalid data passed to the methods for creating a user or updating a user avatar');
        }
        res.send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.updateUser = async(req, res) => {
    try {
        const newUser = await User.updateOne(req.body)

        if (!newUser) {
            res.status(400).send('invalid data passed to the methods for creating a user or updating a user avatar');
        }
        res.send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};
module.exports.updateAvatar = async(req, res) => {
    try {
        console.log(req.body)
        const newAvatr = await User.updateOne(req.body);
        res.send('user avatar was changed');
        if (!newAvatr) {
            res.status(400).send('invalid data passed to the methods for creating a user or updating a user avatar');
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
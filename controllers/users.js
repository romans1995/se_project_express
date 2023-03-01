const User = require("../models/user");
const { response } = require("express");
module.exports.getUsers = (req, res) => {
    User.find({})
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Error' }));
};

module.exports.getUserById = async(req, res) => {

    try {
        const user = await User.findOne({ _id: req.params._id });
        res.send(user);
        if (!user) {
            res.status(404).send('not found a id');
        }
    } catch (error) {
        console.log('Error happend in getUser', error).res.status(500).send('not found');
    }
}
module.exports.createUser = async(req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.send(newUser);
    } catch (error) {
        console.log('getUser error', error);
    }

};
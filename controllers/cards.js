const Card = require("../models/card");
const { response } = require("express");
module.exports.getCards = (req, res) => {
    Card.find({})
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: 'Error', err }));
};

module.exports.createCard = async(req, res) => {
    console.log(req.user._id)
    try {
        const newcard = await Card.create(req.body)
        res.send(newcard);
    } catch (error) {
        console.log('getcard error', error);
    }
};
module.exports.deletecardById = async(req, res) => {
    try {
        const card = await Card.findByIdAndDelete({ _id: req.params._id });
        res.send(newcard);
        if (!card) {
            res.status(404).send('not found a id');
        }
    } catch (error) {
        console.log('Error happend in getcard', error);
        res.status(500).send('not found');
    }
}
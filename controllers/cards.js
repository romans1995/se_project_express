const Card = require("../models/card");
const { response } = require("express");
module.exports.getCards = (req, res) => {
    Card.find({})
        .orFail()
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: 'Error', err }));
};

module.exports.createCard = async(req, res) => {
    try {
        const newcard = await Card.create(req.body)
        res.send(newcard);
        if (!newcard) {
            res.status(400).send('invalid data passed to the methods for creating a card or updating a card image');
        }
    } catch (error) {
        console.log('getcard error', error);
        res.status(500).send('not found');
    }
};
module.exports.deletecardById = async(req, res) => {
    try {
        const card = await Card.findByIdAndDelete({ _id: req.params._id }).orFail(() => {
            throw new NotFoundError('Card not found');
        });
        res.send(newcard);
        if (!card) {
            res.status(404).send('card not found');
        }
    } catch (error) {
        console.log('Error happend in getcard', error);
        res.status(500).send('not found');
    }
}

module.exports.likeCard = async(req, res) => {
    try {
        console.log(req.params);
        await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
            { new: true },
        );
        res.send("like was added");
    } catch (error) {
        console.log('Error happend in likecard', error);
        res.status(500).send('not found');
    }

}
module.exports.dislikeCard = async(req, res) => {
    try {
        await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
            { new: true },
        );
        res.send("like was delted");
    } catch (error) {
        console.log('Error happend in likecard', error);
        res.status(500).send('not found');
    }

}
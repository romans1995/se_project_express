const router = require('express').Router();
const { createCard,getCards,deletecardById,dislikeCard,likeCard} = require('../controllers/cards');

router.get('/:_id',deletecardById);
// router.get('/:_id',getcardById);
router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete(`/:cardId/likes`, dislikeCard);

module.exports = router;


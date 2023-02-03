const router = require('express').Router();
const cards = require('../data/cards.json');

router.get('/cards', (req, res) => {
  res.send('cards');
});
router.get('/cards/:id', (req, res) => {
  const { id } = req.params;
  const resolt = cards.find((card) => card._id === id);
  if (resolt === undefined) {
    res.send({ error: "This user doesn't exist" });
    return;
  }
  res.send(resolt);
});

module.exports = router;

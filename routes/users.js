const router = require('express').Router();
const users = require('../data/users.json');

// console.log(users);
router.get('/users', (req, res) => {
  res.send('users');
});
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const resolt = users.find((user) => user._id === id);
  if (resolt === undefined) {
    res.send({ error: "This user doesn't exist" });
    return;
  }
  res.send(resolt);
});

module.exports = router;

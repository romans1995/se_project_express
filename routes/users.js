const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

let usersData = [];
const filePath = path.resolve('./data/');
router.get('/', (req, res) => {
  fs.readFile(`${filePath}/users.json`, 'utf-8')
    .then((data) => {
      usersData = JSON.parse(data);
      res.send(usersData);
    })
    .catch(() => res.status(500).send({ message: 'something went wrong' }));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const resolt = usersData.find((user) => user._id === id);
  if (resolt === undefined) {
    res.status(404).send({ message: "This user doesn't exist" });
    return;
  }
  res.send(resolt);
});
module.exports = router;

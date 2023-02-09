const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve('./data/');

router.get('/', (req, res) => {
  fs.readFile(`${filePath}/users.json`, 'utf-8')
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => res.status(500).send({ message: 'something went wrong' }));
});

router.get('/:id', (req, res) => {
  fs.readFile(`${filePath}/users.json`, 'utf-8').then((data) => {
    const { id } = req.params;
    const resolt = JSON.parse(data).find((user) => user._id === id);
    if (resolt === undefined) {
      res.status(404).send({ message: "This user doesn't exist" });
      return;
    }
    res.send(resolt);
  }).catch(() => res.status(500).send({ message: 'something went wrong' }));
});
module.exports = router;

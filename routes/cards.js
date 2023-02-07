const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

let cardsData = [];
const filePath = path.resolve('./data/');
router.get('/', (req, res) => {
  fs.readFile(`${filePath}/cards.json`, 'utf-8')
    .then((data) => {
      res.send(data);
      cardsData = JSON.parse(data);
      router.get('/:id', (reqe, resp) => {
        const { id } = reqe.params;
        const resolt = cardsData.find((user) => user._id === id);
        if (resolt === undefined) {
          resp.status(404).send({ error: "This user doesn't exist" });
          return;
        }
        resp.send(resolt);
      });
    })
    .catch(() => res.status(500).send({ error: 'something went wrong' }));
});
module.exports = router;

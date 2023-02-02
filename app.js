const { PORT = 3000 } = process.env;
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const userRoutes = require('./routes/users.js');


let userData ;
const filePath = path.join(__dirname, 'data');
fs.readFile(`${filePath}/users.json`,'utf-8', (err, data) => {
    if (err) {      
      console.log(`Error reading file: ${err}`)
      return;
    }
      userData = data;
  });
app.get('/users', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(userData)
  
});

app.get('/cards', (req, res) => {
  fs.readFile(`${filePath}/cards.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send(`Error reading file: ${err}`);
      return;
    }
    res.set('Content-Type', 'application/json');
    res.send(data);
  });
});

app.use(express.static(path.join(__dirname, 'routes')));
app.use('/',userRoutes);

app.listen(PORT, () => {
    console.log('Server listening on port 3000');
});
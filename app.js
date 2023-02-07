const { PORT = 3000 } = process.env;
const express = require('express');

const path = require('path');

const app = express();

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use(express.static(path.join(__dirname, 'routes')));
app.use('/cards', cardRoutes);
app.use('/users', userRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource was not found' });
});
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});

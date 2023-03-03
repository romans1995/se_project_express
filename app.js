const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const app = express();

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/aroundb');
mongoose.set('strictQuery', true);
app.use((req, res, next) => {
  req.user = {
    _id: '63ff590682ad41f0582569bc' // paste the _id of the test user created in the previous step
  };

  next();
}); 
// mongoose.connect('mongodb://localhost:27017/aroundb',{
//   useNewUrlParser:false,
//   useCreateIndex:true,
//   useFindAndModify:false,
// });


app.use(express.json());
app.use(express.static(path.join(__dirname, 'routes')));
app.use('/cards', cardRoutes);
app.use('/users', userRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource was not found' });
});
app.listen(PORT, () => {
  console.log('Server listening on port 3000');
});

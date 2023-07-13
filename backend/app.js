const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const handleError = require('./middlewares/handleError');
const { userLogin, createUser } = require('./controllers/user');
const { validateUserAuth, validateUserCreate } = require('./utils/joiValidate');

const BASE_PATH = 'mongodb://127.0.0.1:27017/mestodibil';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(BASE_PATH)
  .then(() => {
    console.log('Подключение произошло успешно. Поздравляю, пользователь');
  }).catch((err) => {
    console.error(err);
    console.log(err);
  });

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateUserCreate, createUser);
app.post('/signin', validateUserAuth, userLogin);

app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такого пути не существует' });
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log('mongodb://localhost:27017/mestodibil');
});

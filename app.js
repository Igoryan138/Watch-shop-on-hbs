require('dotenv').config(); // подключение переменных env

const express = require('express'); // подключение  express
const morgan = require('morgan'); // подключение  morgan
const hbs = require('hbs'); // подключение  handlebars
const path = require('path');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const adminRouter = require('./routes/adminRouter');

const formRouter = require('./routes/formRouter');

const API = require('./routes/API');


const dbCheck = require('./db/dbCheck'); // подключение скрипта проверки соединения с БД

const { PORT } = process.env || 3001; // получение переменных env, в данный момент только PORT

const app = express(); // создание версии сервера express'a

dbCheck(); // вызов функции проверки соединения с базоый данных

const sessionConfig = {
  store: new FileStore(),
  key: process.env.COOKIE_NAME,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  if (req.session.adminId) {
    res.locals.adminId = req.session.adminId;
  }
  next();
});

app.set('view engine', 'hbs'); // настройка отрисовщика, в данный момент это HBS
hbs.registerPartials(`${__dirname}/views/partials`); // закоментить если не используются partials
app.use(express.static(path.join(__dirname, 'public'))); // подключение  public директории

app.use(morgan('dev')); // добавление настроек и инициализация morgan

app.use(express.urlencoded({ extended: true })); // добавление отлова post запросов.
app.use(express.json()); // парсинг post запросов в json.

// app.use('/', formRouter);

app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/form', formRouter); // ! Не удалять
app.use('/logout', logoutRouter);
app.use('/admin', adminRouter);
app.use('/api', API);

app.get('*', (req, res) => {
  res.render('error');
});

// ! запуск сервера где PORT это порт вашего сервера.
// ! если не подключали .env то замените на цифры(например по умолчанию 3000)
app.listen(PORT, () => {
  console.log(`Сервер запущен наs порте ${PORT}! `)
});

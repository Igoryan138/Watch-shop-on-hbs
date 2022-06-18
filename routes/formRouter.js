const router = require('express').Router();

const multer = require('multer'); // библиотека для работы с фс
const moment = require('moment');

const { Contact } = require('../db/models');
const mailer = require('../middlewares/mailer');

// Создаю переменные для работы с названиями путей
let pathFile;
let fileName;

// Задаю конфигурацию для модуля сохранения файлов
const storage = multer.diskStorage({
  destination(req, file, cb) {
    pathFile = 'public/scetchs';
    cb(null, pathFile);
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    fileName = `${date}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// обработка отправки формы
router.post('/', upload.single('scetch'), async (req, res) => {
  const {
    contact_name, email, phone,
  } = req.body;

  // тут начинается логика внесения заявки в базу
  try {
    const newContact = await Contact.create({
      contact_name,
      email,
      phone,
      scetch: `scetchs/${fileName}`,
    });
    res.json(newContact);
  } catch (error) {
    console.log('Ошибка записи');
  }
  // ! тут начинается логика отправки сообщения
  const message = {
    to: email,
    subject: 'Ваш магазин часов ручной работы Wira Watch',
    html: `
        <h2>${contact_name}, поздравляем, Вы успешно оформили консультацию на нашем сайте!</h2>
        
        <i>Ожидайте, в скором времени с Вами свяжется наш консультант! Если Вы забыли оставить контактный телефон - то можете прислать его в ответном письме!</i>
        `,
  };
  mailer(message);
});

// // отображение страницы благодарности
// router.get('/succes_page', (req, res) => {
//   res.render('succes_page');
// });

module.exports = router;

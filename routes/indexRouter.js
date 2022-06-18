const router = require('express').Router();

const multer = require('multer'); // библиотека для работы с фс
const moment = require('moment');
const { Watch, ourContacts } = require('../db/models');

const checkIsNotSession = require('../middlewares/checkIsNotSession'); // библиотека для работы с датой

// Создаю переменные для работы с названиями путей
let pathFile;
let fileName;

// Задаю конфигурацию для модуля сохранения файлов
const storage = multer.diskStorage({
  destination(req, file, cb) {
    pathFile = 'public/images';
    cb(null, pathFile);
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    fileName = `${date}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// отображение главной страницы
router.get('/', async (req, res) => {
  try {
    const allModels = await Watch.findAll();
    const contacts = await ourContacts.findOne({ where: { id: 1 } });

    res.render('index', { allModels, contacts });
  } catch (error) {
    console.log(error.message);
  }
});

router.post('/newWatch', upload.single('img'), async (req, res) => {
  const { model_name, img } = req.body;
  try {
    const newWatches = await Watch.create({ model_name, img: `images/${fileName}` });
    res.json(newWatches);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

router.delete('/:id', checkIsNotSession, async (req, res) => {
  const { id } = req.params;
  try {
    await Watch.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/scetchs/:imgLink', (req, res) => {
  const { imgLink } = req.params;
  console.log(imgLink);
});

module.exports = router;

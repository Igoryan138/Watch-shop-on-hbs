const dotenv = require('dotenv');

const router = require('express').Router();
const fs = require('fs');
const { Contact, ourContacts, Admin } = require('../db/models');
const checkIsNotSession = require('../middlewares/checkIsNotSession');
const randomKey = require('../middlewares/randomKey');
const mailer = require('../middlewares/mailer');

router.get('/', async (req, res) => {
  let contacts;

  try {
    contacts = await Contact.findAll({ order: [['id', 'DESC']] });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }

  return res.render('all/adminPage', { contacts });
});

router.get('/saveOrders', async (req, res) => {
  try {
    const orders = await Contact.findAll();
    let string = '';
    orders.forEach((element) => {
      string += `Имя клиента: ${element.contact_name}, email: ${element.email}, Телефон: ${element.phone}, Ссылка на набросок: ${req.hostname}/${element.scetch}, Статус заявки: ${element.status}, Дата создания: ${element.createdAt}, Дата последнего изменения: ${element.updatedAt}\n`;
    });
    const pathNewList = '/docs/ordersList.csv';
    fs.writeFileSync(`./public${pathNewList}`, string);
    res.json({ pathNewList });
  } catch (error) {
    console.log(error.message);
  }
});

router.put('/editContacts', async (req, res) => {
  try {
    const newContacts = await ourContacts.findOne({ where: { id: 1 } });
    if (newContacts) {
      newContacts.adress = req.body.adress;
      newContacts.tel = req.body.tel;
      newContacts.wa = req.body.tel;
      newContacts.tlg = req.body.tlg;
      newContacts.inst = req.body.inst;
      newContacts.save();
      return res.sendStatus(200);
    }
    await ourContacts.create({
      adress: req.body.adress,
      tel: req.body.tel,
      wa: req.body.tel,
      tlg: req.body.tlg,
      inst: req.body.inst,
    });
  } catch (error) {
    return res.json({ errorMessage: 'Не удалось обновить запись в базе данных.' });
  }
  res.redirect('/');
});

router.get('/editContacts', (req, res) => {
  res.redirect('/');
});

// Отправка ключа для смены пароля на емаил
router.get('/getKey', async (req, res) => {
  const key = randomKey();
  console.log(key);
  try {
    const admin = await Admin.findOne({
      where: res.locals.adminId,
    });
    admin.key = key;
    admin.save();
    const message = {
      to: admin.email,
      subject: 'Код для изменения данных',
      html: `
          <h2>Введите этот код в соответствующее поле</h2>

          <h1>${key}</h1>

          <i></i>
          `,
    };
    mailer(message);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
});

// обработка формы смены данных админа
router.post('/changeData', async (req, res) => {
  const {
    email, password, inputKey,
  } = req.body;
  try {
    const admin = await Admin.findOne({
      where: res.locals.adminId,
    });
    if (inputKey === admin.key) {
      admin.email = email;
      admin.password = password;
      admin.key = null;
      admin.save();
      console.log('vse ok');
      res.sendStatus(200);
    } else {
      console.log('ne ok');

      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/forgotPass', async (req, res) => {
  const newPassword = randomKey();
  try {
    const admin = await Admin.findOne({
      where: 1,
    });
    admin.password = newPassword;
    admin.save();
    const message = {
      to: admin.email,
      subject: 'Восстановление пароля',
      html: `
          <h2>Новый пароль:</h2>

          <h1>${newPassword}</h1>

          <i></i>
          `,
    };
    mailer(message);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
});

// обработка смены статусов заявки
router.post('/getStatus/:id', async (req, res) => {
  try {
    const { id, value } = req.body;

    const status = await Contact.findOne({
      where: {
        id,
      },
    });

    const statusBefore = status.status;

    if (value === 'Получен') {
      await Contact.update({
        status: value,
      }, {
        where: {
          id,
        },
      });
    }

    if (value === 'Завершен') {
      await Contact.update({
        status: value,
      }, {
        where: {
          id,
        },
      });
    }

    if (value === 'В работе') {
      await Contact.update({
        status: value,
      }, {
        where: {
          id,
        },
      });
    }

    const statusAfter = await Contact.findOne({
      where: {
        id,
      },
    });
    res.json(statusAfter);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

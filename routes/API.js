const router = require('express').Router();
const { Watch } = require('../db/models');

router.get('/', async (req, res) => {
  const host = req.hostname;
  try {
    const allModels = await Watch.findAll({ raw: true });
    allModels.forEach((element) => {
      element.source = req.hostname;
    });
    console.log(allModels);
    res.render('all/api', { host, allModels });
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/all', async (req, res) => {
  try {
    const allModels = await Watch.findAll({ raw: true });
    allModels.forEach((element) => {
      element.img = `${req.hostname}/${element.img}`;
      element.source = req.hostname;
    });
    res.json(allModels);
  } catch (error) {
    console.log(error.message);
  }
});

router.get('/all/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const models = await Watch.findOne({
      raw: true,
      where: { id },
    });
    models.source = req.hostname;
    res.json(models);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

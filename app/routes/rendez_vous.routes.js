module.exports = app => {
  const rendez_vous = require("../controllers/rendez_vous.controller.js");

  var router = require("express").Router();

  router.put("/update/:id", rendez_vous.update);

  app.use('/api/rdv', router);

};
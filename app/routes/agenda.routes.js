module.exports = app => {
  const agenda = require("../controllers/agenda.controller.js");

  var router = require("express").Router();
  router.post("/", agenda.create);
  router.get("/", agenda.findAll);
  router.get("/tel", agenda.findAlltel);
  router.get("/:id", agenda.findOne);
  router.put("/:id", agenda.update);
  router.delete("/:id", agenda.delete);
  router.delete("/", agenda.deleteAll);
  app.use('/api/agendas', router);
};
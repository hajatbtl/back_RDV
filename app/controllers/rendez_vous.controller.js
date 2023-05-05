const Rendez_vous = require("../models/rendez_vous.model.js");

// Create and Save a new Tutorial

// Update a rendez_vousidentified by the id in the request
exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  Rendez_vous.updateById(req.body.status, req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found rendez_vous with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating rendez_vous with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });

};

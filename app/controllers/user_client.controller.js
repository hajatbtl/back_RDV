const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const user = new User_client({
    nom_prenom: req.body.nom_prenom,
    id_client: req.body.id_client,
    id_rendez_vous: req.body.id_rendez_vous
  });

  // Save userin the database
  User_client.create(user_client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });

};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const nom_prenom = req.query.nom_prenom;

  User_client.getAll(nom_prenom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAllid_rendez_vous = (req, res) => {
    User_client.getAllid_rendez_vous((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });

};

// Find a single user_clientwith a id
exports.findOne = (req, res) => {
    User_client.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user_clientwith id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving userwith id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all id_rendez_vous Tutorials
exports.findAllid_rendez_vous = (req, res) => {
  const nom_prenom = req.query.nom_prenom;

  user_client_client.getAll(nom_prenom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAllid_rendez_vous = (req, res) => {
    User_client.getAllid_rendez_vous((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a user_clientidentified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User_client.updateById(
    req.params.id,
    new User_client(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found userwith id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating userwith id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );

};

// Delete a userwith the specified id in the request
exports.delete = (req, res) => {
    User_client.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userwith id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete userwith id " + req.params.id
        });
      }
    } else res.send({ message: `userwas deleted successfully!` });
  });

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User_client.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });

};
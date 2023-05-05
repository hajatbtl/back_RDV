const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const user = new User({
    nom_prenom: req.body.nom_prenom,
    email: req.body.email,
    tel: req.body.tel
  });

  // Save userin the database
  User.create(user, (err, data) => {
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

  User.getAll(nom_prenom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAlltel = (req, res) => {
  User.getAlltel((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });

};

// Find a single userwith a id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found userwith id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving userwith id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all tel Tutorials
exports.findAlltel = (req, res) => {
  const nom_prenom = req.query.nom_prenom;

  User.getAll(nom_prenom, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

exports.findAlltel = (req, res) => {
  User.getAlltel((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a useridentified by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
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
  User.remove(req.params.id, (err, data) => {
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
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });

};
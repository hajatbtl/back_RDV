const Agenda = require("../models/agenda.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const agenda = new Agenda({
        nom: req.body.nom,
        google_agenda_key: req.body.google_agenda_key,
        
    });

    // Save agendain the database
    Agenda.create(agenda, (err, data) => {
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
    const nom = req.query.nom;

    Agenda.getAll(nom, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findAlltel = (req, res) => {
    Agenda.getAlltel((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });

};

// Find a single agendawith a id
exports.findOne = (req, res) => {
    Agenda.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found agendawith id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving agendawith id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all tel Tutorials
exports.findAlltel = (req, res) => {
    const nom = req.query.nom;

    Agenda.getAll(nom, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "agendaome error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findAlltel = (req, res) => {
    Agenda.getAlltel((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Update a agendaidentified by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Agenda.updateById(
        req.params.id,
        new Agenda(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found agendawith id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating agendawith id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );

};

// Delete a agendawith the specified id in the request
exports.delete = (req, res) => {
    Agenda.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found agendawith id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete agendawith id " + req.params.id
                });
            }
        } else res.send({ message: `agendawas deleted successfully!` });
    });

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Agenda.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });

};
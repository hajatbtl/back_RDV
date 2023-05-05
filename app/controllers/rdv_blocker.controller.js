const Rdv_blocker = require("../models/rdv_blocker.model.js");

exports.affichage = (req, res) => {
    Rdv_blocker.affichage((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};
exports.insert = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const newRdv_blocker = new Rdv_blocker({
        date:req.body.date,
        heure:req.body.heure,
    });

    Rdv_blocker.insert(newRdv_blocker, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
            else res.send(data);
      
    });
};
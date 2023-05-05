const Client = require("../models/client.model.js");
const Rendez_vous = require("../models/rendez_vous.model.js");

exports.delete = (req, res) => {
    Client.remove(req.params.id, (err, data) => {
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
        } else res.send({ message: `user was deleted successfully!` });
    });

};

exports.affichage = (req, res) => {
    Client.affichage((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};
exports.filterdate = (req, res) => {
    Client.filtredate(req.params.from, req.params.to, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.filter = (req, res) => {
    Client.filtre(req.params.status, req.params.from, req.params.to, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};
// exports.filterdate = (req, res) => {
//     Client.filtredate(req.params.date, (err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving data."
//             });
//         else res.send(data);
//     });
// };

exports.filteremail = (req, res) => {
    Client.filtreemail(req.params.email, (err, data) => {
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

    const client = new Client({
        nom_prenom: req.body.nom_prenom,
        email: req.body.email,
        tel: req.body.tel,
        etablissement: req.body.etablissement,
        objet: req.body.objet
    });

    Client.insert(client, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else {
            const rdv = new Rendez_vous({
                date: req.body.date,
                heure: req.body.heure,
                duree: req.body.duree,
                id_event: req.body.id_event,
                status: "RESERVED",
                id_client: data.id
            });

            Rendez_vous.create(rdv, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Tutorial."
                    });
                else res.send(data);
            });
        }
    });

};
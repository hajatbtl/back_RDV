const sql = require("./db.js");
// constructor
const Agenda = function (agenda) {
    this.nom = agenda.nom,
        this.google_agenda_key = agenda.google_agenda_key,
        this.tel = agenda.tel
};
Agenda.create = (newAgenda, result) => {
    sql.query("INSERT INTO agenda SET ?", newAgenda, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created agenda: ", { id: res.insertId, ...newAgenda });
        result(null, { id: res.insertId, ...newAgenda});
    });
};


Agenda.findById = (id, result) => {
    sql.query(`SELECT * FROM agenda WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Agenda.getAll = (title, result) => {
    let query = "SELECT * FROM agenda";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("agenda: ", res);
        result(null, res);
    });
};

Agenda.getAllPublished = result => {
    sql.query("SELECT * FROM agenda WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("agenda: ", res);
        result(null, res);
    });
};

Agenda.updateById = (id, agenda, result) => {
    sql.query(
        "UPDATE agenda SET title = ?, description = ?, published = ? WHERE id = ?",
        [agenda.nom, agenda.google_agenda_key, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tutorial: ", { id: id, ...agenda });
            result(null, { id: id, ...agenda });
        }
    );
};


Agenda.remove = (id, result) => {
    sql.query("DELETE FROM agenda WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};



Agenda.removeAll = result => {
    sql.query("DELETE FROM agenda", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} agenda`);
        result(null, res);
    });
};

module.exports = Agenda;

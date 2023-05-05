const sql = require("./db.js");
// constructor
const Rendez_vous = function (rendez_vous) {
    this.date = rendez_vous.date,
        this.heure = rendez_vous.heure,
        this.duree = rendez_vous.duree,
        this.status = rendez_vous.status,
        this.id_client = rendez_vous.id_client,
        this.id_event = rendez_vous.id_event
};
Rendez_vous.create = (newRendez_vous, result) => {
    sql.query("INSERT INTO rendez_vous SET ?", newRendez_vous, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created rendez_vous: ", { id: res.insertId, ...newRendez_vous });
        result(null, { id: res.insertId, ...newRendez_vous });
    });
};

Rendez_vous.findById = (id, result) => {
    sql.query(`SELECT * FROM rendez_vous WHERE id = ${id}`, (err, res) => {
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

Rendez_vous.getAll = (title, result) => {
    let query = "SELECT * FROM rendez_vous";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("rendez_vous: ", res);
        result(null, res);
    });
};

Rendez_vous.getAllPublished = result => {
    sql.query("SELECT * FROM rendez_vous WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("rendez_vous: ", res);
        result(null, res);
    });
};

Rendez_vous.updateById = (status, id, result) => {
    sql.query(
        "UPDATE rendez_vous SET status = ?  WHERE id = ?",
        [status, id],
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

            console.log("updated tutorial: ", { id: id, status });
            result(null, { id: id, status });
        }
    );
};

Rendez_vous.remove = (id, result) => {
    sql.query("DELETE FROM rendez_vous WHERE id = ?", id, (err, res) => {
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

Rendez_vous.removeAll = result => {
    sql.query("DELETE FROM rendez_vous", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} rendez_vous`);
        result(null, res);
    });
};

module.exports = Rendez_vous;

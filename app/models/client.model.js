const sql = require("./db.js");
// constructor
const Client = function (client) {
    this.nom_prenom = client.nom_prenom,
        this.email = client.email,
        this.tel = client.tel,
        this.etablissement = client.etablissement,
        this.objet = client.objet
};


Client.insert = (newClient, result) => {
    sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created client: ", { id: res.insertId, ...newClient });
        result(null, { id: res.insertId, ...newClient });
    });
};

Client.findById = (id, result) => {
    sql.query(`SELECT * FROM client WHERE id = ${id}`, (err, res) => {
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

Client.affichage = (result) => {
    sql.query(`SELECT c.id as user_id, r.id as rdv_id, c.nom_prenom, c.email, c.tel, c.etablissement, r.date, r.heure, r.duree, r.status
    FROM client c
    INNER JOIN rendez_vous r ON r.id_client = c.id;`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("client: ", res);
            result(null, res);
        });
};


Client.filtre = (status, from, to, result) => {
    sql.query(`SELECT r.id_event, c.id as user_id, r.id as rdv_id, c.nom_prenom, c.email, c.tel, c.etablissement, r.date, r.heure, r.duree, r.status
    FROM client c
    INNER JOIN rendez_vous r ON r.id_client = c.id WHERE r.status = '${status}' ` + (from ? `and r.date BETWEEN '${from}' AND '${to}'` : ``),
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("client: ", res);
            result(null, res);
        });
};

Client.filtredate = (from, to, result) => {
    sql.query(
        `SELECT c.id as user_id, r.id as rdv_id, c.nom_prenom, c.email, c.tel, c.etablissement, r.date, r.heure, r.duree, r.status 
         FROM client c INNER JOIN rendez_vous r ON r.id_client = c.id WHERE r.date BETWEEN ? AND ?`,
        [from, to],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("client: ", res);
            result(null, res);
        }
    );
};

Client.filtreemail = (email, result) => {
    sql.query(`SELECT c.id as user_id, r.id as rdv_id, c.nom_prenom, c.email, c.tel, c.etablissement, r.date, r.heure, r.duree, r.status
    FROM client c
    INNER JOIN rendez_vous r ON  c.id = r.id_client WHERE  c.email = '${email}'`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("client: ", res);
            result(null, res);
        });
};


Client.getAll = (title, result) => {
    let query = "SELECT * FROM client";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("client: ", res);
        result(null, res);
    });
};

Client.getAllPublished = result => {
    sql.query("SELECT * FROM client WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("client: ", res);
        result(null, res);
    });
};

Client.updateById = (id, client, result) => {
    sql.query(
        "UPDATE client SET title = ?, description = ?, published = ? WHERE id = ?",
        [client.nom_prenom, client.email, client.tel, id],
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

            console.log("updated tutorial: ", { id: id, ...client });
            result(null, { id: id, ...client });
        }
    );
};



Client.remove = (id, result) => {
    sql.query("DELETE client, rendez_vous FROM client LEFT JOIN rendez_vous ON client.id = rendez_vous.id_client WHERE client.id = ?;", id, (err, res) => {
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



Client.removeAll = result => {
    sql.query("DELETE FROM client", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} client`);
        result(null, res);
    });
};

module.exports = Client;

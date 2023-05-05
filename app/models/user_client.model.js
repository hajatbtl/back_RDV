const sql = require("./db.js");
// constructor
const User_client = function (user_client) {
    this.id_user = user_client.id_user,
        this.id_client = user_client.id_user,
        this.id_rendez_vous = user_client.id_rendez_vous
};
User_client.create = (newUser_client, result) => {
    sql.query("INSERT INTO user_client SET ?", newUser_client, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newUser_client });
        result(null, { id: res.insertId, ...newUser_client });
    });
};

User_client.findById = (id, result) => {
    sql.query(`SELECT * FROM user_client WHERE id = ${id}`, (err, res) => {
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

User_client.getAll = (title, result) => {
    let query = "SELECT * FROM user_client";

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user_client: ", res);
        result(null, res);
    });
};

User_client.getAllPublished = result => {
    sql.query("SELECT * FROM user_client WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user_client: ", res);
        result(null, res);
    });
};

User_client.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user_client SET title = ?, description = ?, published = ? WHERE id = ?",
        [user_client.id_user, user_client.id_client, user_client.id_rendez_vous, id],
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

            console.log("updated tutorial: ", { id: id, ...user_client });
            result(null, { id: id, ...user_client });
        }
    );
};

User_client.remove = (id, result) => {
    sql.query("DELETE FROM user_client WHERE id = ?", id, (err, res) => {
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

User_client.removeAll = result => {
    sql.query("DELETE FROM user_client", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} user_client`);
        result(null, res);
    });
};

module.exports = User_client;

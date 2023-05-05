const sql = require("./db.js");

const Rdv_blocker = function (rdv_blocker) {
    this.date = rdv_blocker.date,
        this.heure = rdv_blocker.heure
       
};


Rdv_blocker.insert = (newRdv_blocker, result) => {
    sql.query("INSERT INTO rdv_blocker SET ?", newRdv_blocker, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created rdv_blocker: ", { id: res.insertId, ...newRdv_blocker });
        result(null, { id: res.insertId, ...newRdv_blocker });
    });
};
Rdv_blocker.affichage = (result) => {
    sql.query(`SELECT * FROM rdv_blocker`,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("rdv_blocker: ", res);
            result(null, res);
        });
};


module.exports = Rdv_blocker;

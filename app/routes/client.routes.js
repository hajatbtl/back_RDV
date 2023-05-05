module.exports = app => {
    const client = require("../controllers/client.controller.js");

    var router = require("express").Router();

    router.get("/", client.affichage);
    router.get("/:status", client.filter);
    router.get("/:status/:from/:to", client.filter);
    // router.get("/date/:from/:to", client.filterdate);
    router.get("/email/:email", client.filteremail);

    router.post("/add", client.insert);



    router.delete("/delete/:id", client.delete);

    app.use('/api/clients', router);

};
module.exports = app => {
    
    const rdv_blocker = require("../controllers/rdv_blocker.controller.js");

    var router = require("express").Router();

   router.get("/", rdv_blocker.affichage);
    router.post("/insert", rdv_blocker.insert);
    
    
    app.use('/api/rdv_blocker', router);



};
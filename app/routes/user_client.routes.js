module.exports = app => {
    const user_clients = require("../controllers/user_client.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user_client
    router.post("/", user_clients.create);


    // Retrieve all user_clients
    router.get("/", user_clients.findAll);

  
    // Retrieve a single user_client with id
    router.get("/:id", user_clients.findOne);
    

  
    // Update a user_client with id
    router.put("/:id", user_clients.update);
 
  
    // Delete a user_client with id
    router.delete("/:id", user_clients.delete);
  
  
    // Delete all user_clients
    router.delete("/", user_clients.deleteAll);
  
  
    app.use('/api/user_clients', router);
   
  };
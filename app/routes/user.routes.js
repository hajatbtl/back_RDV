module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user

    // Retrieve all users
    router.get("/", users.findAll);

  
    // Retrieve all tel users
    router.get("/tel", users.findAlltel);

  
    // Retrieve a single user with id
    router.get("/:id", users.findOne);

  
    // Update a user with id
    router.put("/:id", users.update);
 
  
    // Delete a user with id
    router.delete("/:id", users.delete);
    
  
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
  
    app.use('/api/users', router);
   
  };
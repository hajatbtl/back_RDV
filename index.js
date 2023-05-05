const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route

require("./app/routes/user.routes.js")(app);
require("./app/routes/client.routes.js")(app);
require("./app/routes/user_client.routes.js")(app);
require("./app/routes/agenda.routes.js")(app);
require("./app/routes/rendez_vous.routes.js")(app);
require("./app/routes/rdv_blocker.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
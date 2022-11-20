const express = require("express");
const cors = require('cors')
const HealthController = require("./application/controllers/health.controller");
const VehiclesController = require("./application/controllers/vehicles.controller");

const server = express()

// middlewares
server.use(express.json())
server.use(cors())

// routes
server.use("/api/v1/health", HealthController);
server.use("/api/v1/vehicles", VehiclesController);

server.listen("4000", () => {
    console.info("Server running at port http://localhost:4000");
})
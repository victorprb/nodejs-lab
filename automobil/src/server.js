import express from "express";
import { HealthController, VehiclesController } from "./application/controllers";

const server = express()

// middlewares
server.use(express.json())

// routes
server.use("/api/v1/health", HealthController);
server.use("/api/v1/vehicles", VehiclesController);

server.listen("3000", () => {
    console.info("Server running at port http://localhost:3000");
})
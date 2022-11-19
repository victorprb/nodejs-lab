import { Router } from "express";
import { VehiclesService } from "../services/vehicles";

const router = Router();

router.get("/", (req, res, next) => {
    const vehicles = VehiclesService.getVehicles()
    res.send(vehicles)
})

router.get("/:id", (req, res, next) => {
    const vehicle = VehiclesService.findVehicle({ id: req.params.id })

    res.send(vehicle)
})

router.post("/", (req, res, next) => {
    const vehicle = VehiclesService.addVehicle(req.body)

    res.status(201).send(vehicle)
})

router.put("/", (req, res, next) => {
    VehiclesService.updateVehicle(req.body)

    res.status(200).send(req.body)
})

router.patch("/", (req, res, next) => {
    VehiclesService.updateVehicle(req.body)

    res.status(200).send(req.body)
})

router.delete("/:id", (req, res, next) => {
    VehiclesService.deleteVehicle(req.params.id)

    res.sendStatus(204)
})

export const VehiclesController = router;
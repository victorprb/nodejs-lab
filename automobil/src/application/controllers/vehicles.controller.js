const { Router } = require("express");
const vehiclesService = require("../services/vehicles");

const router = Router();

router.get("/", async (req, res, next) => {
    const vehicles = await vehiclesService.getVehicles(req.query)

    res.send(vehicles)
})

router.get("/:id", async (req, res, next) => {
    const vehicle = await vehiclesService.findVehicle({ id: req.params.id })

    res.send(vehicle)
})

router.post("/", async (req, res, next) => {
    const vehicle = await vehiclesService.addVehicle(req.body)

    res.status(201).send(vehicle)
})

router.put("/:id", async (req, res, next) => {
    const vehicle = await vehiclesService.updateVehicle({ ...req.body, id: req.params.id })

    res.status(200).send(vehicle)
})

router.patch("/:id", async (req, res, next) => {
    const vehicle = await vehiclesService.updateVehicle({ ...req.body, id: req.params.id })

    res.status(200).send(vehicle)
})

router.delete("/:id", async (req, res, next) => {
    await vehiclesService.deleteVehicle(req.params.id)

    res.sendStatus(204)
})

module.exports = router;
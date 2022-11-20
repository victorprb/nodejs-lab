const parseISO = require('date-fns/parseISO')
const { Vehicle } = require('../../db/models')
const { Op, Sequelize } = require("sequelize");

class VehiclesService {
    constructor(vehiclesRepo) {
        this.vehiclesRepo = vehiclesRepo
    }

    async getVehicles(filters) {
        const where = {}

        const { sold, brand, fromDate, toDate } = filters

        if (sold) {
            where["sold"] = sold
        }

        if (brand) {
            where["brand"] = brand
        }

        if (fromDate) {
            where["createdAt"] = {
                [Op.gte]: parseISO(fromDate)
            }
        }

        if (toDate) {
            where["createdAt"] = {
                [Op.lte]: parseISO(toDate)
            }
        }

        return await this.vehiclesRepo.findAll({
            order: ["id"],
            where
        });
    }

    async getVehicle(id) {
        return this.vehiclesRepo.findByPk(id)
    }

    async addVehicle(vehicle) {
        return await this.vehiclesRepo.create(vehicle)
    }

    async updateVehicle(vehicle) {
        return await this.vehiclesRepo.update(vehicle, {
            where: {
                id: vehicle.id
            }
        })
    }

    async deleteVehicle(id) {
        return await this.vehiclesRepo.destroy({ where: { id: id } })
    }

    async vehiclesDashboard() {
        const soldVehicles = await this.vehiclesRepo.count({ where: { sold: true } })
        const vehiclesByBrand = await this.vehiclesRepo.count({
            attributes: ["brand"],
            group: "brand"
        })
        const vehiclesByDecade = await this.vehiclesRepo.count({
            attributes: [
                [
                    Sequelize.fn(
                        "div",
                        Sequelize.fn(
                            "div",
                            Sequelize.col("year"),
                            10
                        ),
                        0.1
                    ),
                    "decade"
                ]
            ],
            group: "decade",
            order: ["decade"]
        })

        const formattedVehiclesByBrand = vehiclesByBrand.map(item => {
            return [item.brand, item.count]
        })

        const formattedVehiclesByDecade = vehiclesByDecade.map(item => {
            return [item.decade, item.count]
        })

        return {
            soldVehicles: soldVehicles,
            vehiclesByBrand: formattedVehiclesByBrand,
            vehiclesByDecade: formattedVehiclesByDecade,
        }
    }
}

const vehiclesService = new VehiclesService(Vehicle)

module.exports = vehiclesService;
const parseISO = require('date-fns/parseISO')
const { Vehicle } = require('../../db/models')
const { Op } = require("sequelize");

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
}

const vehiclesService = new VehiclesService(Vehicle)

module.exports = vehiclesService;
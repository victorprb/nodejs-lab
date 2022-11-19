let vehicles = [
    { id: 1, name: "corsa" },
    { id: 2, name: "golf" },
    { id: 3, name: "camaro" },
    { id: 4, name: "jeep" },
    { id: 5, name: "onix" },
]

function getVehicles() {
    return vehicles
}

function findVehicle(params) {
    return vehicles.find(vehicle => {
        return vehicle.id == params.id
    })
}

function addVehicle(vehicle) {
    vehicles = [...vehicles, vehicle]

    return vehicle
}

function updateVehicle(vehicle) {
    vehicles = vehicles.map(v => {
        if (vehicle.id == v.id) {
            return vehicle
        }

        return v
    })
}

function deleteVehicle(id) {
    vehicles = vehicles.filter(vehicle => {
        return vehicle.id != id
    })
}

export const VehiclesService = { getVehicles, findVehicle, addVehicle, updateVehicle, deleteVehicle }
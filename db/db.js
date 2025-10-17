require("reflect-metadata");
const path = require("path");
const { DataSource } = require("typeorm");
const { seed } = require("../entity/seed");
const { seed_data } = require("../entity/seed_data")

const AppDataSource = new DataSource({
    type:"sqlite",
    database: path.resolve(__dirname, "..", "data", "seedDB.db"),
    entities: [seed,seed_data]
})

module.exports = { AppDataSource };
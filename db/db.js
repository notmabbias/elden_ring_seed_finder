require("reflect-metadata");
const path = require("path");
const { DataSource } = require("typeorm");
const { seed } = require("../entity/seed");

const AppDataSource = new DataSource({
    type:"sqlite",
    database: path.resolve(__dirname, "..", "data", "seedDB.db"),
    logging: true,
    entities: [seed]
})

module.exports = { AppDataSource };
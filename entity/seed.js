const { EntitySchema } = require("typeorm");

module.exports.seed = new EntitySchema({
    name: "seed",
    tableName:"seed_repository",
    columns: {
        seed: {
            primary: true,
            type: "int"
        },
        nightlord: {
            type:"text",
            nullable: false
        },
        shifting_earth: {
            type:"text",
            nullable: false
        },
        summonwater_base: {
            type:"text",
            nullable: false
        },
        summonwater_element: {
            type:"text",
            nullable: false
        },
        mistwood_base: {
            type:"text",
            nullable: false
        },
        mistwood_element: {
            type:"text",
            nullable: false
        },
        hawk_small_base: {
            type:"text",
            nullable: false
        },
        church_small_base: {
            type:"text",
            nullable: false
        }
    }
})
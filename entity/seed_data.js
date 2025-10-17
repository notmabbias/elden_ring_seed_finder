const { EntitySchema } = require("typeorm");

module.exports.seed_data = new EntitySchema({
    name:"seed_data",
    tableName:"seed_data",
    columns: {
        seed: {
            primary: true,
            type: "int"
        },
        event: {
            type:"text",
            nullable: false
        },
        boss1: {
            type:"text",
            nullable: false
        },
        boss2: {
            type:"text",
            nullable: false
        },
        extra_boss: {
            type:"text",
            nullable: false
        },
        castle_enemy: {
            type:"text",
            nullable: false
        },
        top_castle: {
            type:"text",
            nullable: false
        },
        bottom_castle: {
            type:"text",
            nullable: false
        }
    }
});
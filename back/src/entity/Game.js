const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Game",
    columns: {
        id: {
            primary: true,
            generated: true,
            type: "int",
        },
        name: {
            type: "text",
        },
    },
    relations: {
        target: {
            target: "Platform",
            type: "many-to-many",
            joinTable: true,
            cascade: true,
        },
    },
});
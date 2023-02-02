const typeorm = require("typeorm");

module.exports = {
    datasource: new typeorm.DataSource({
    type: "sqlite",
    database: "./gameLibrarydb.sqlite",
    synchronize: true,
    entities: [require('./entity/Game')],
}),
}

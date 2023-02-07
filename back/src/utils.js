const typeorm = require("typeorm");
const Game = require("./entity/Game");
const Platform = require("./entity/Platform");

module.exports ={
     dataSource: new typeorm.DataSource({
        type: "sqlite",
        database: "./gameLibrarydb.sqlite",
        synchronize: true,
        entities: [Game, Platform],
        logging: ['query', 'error'],
    }),
};

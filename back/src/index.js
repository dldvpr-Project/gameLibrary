const express = require("express");
const typeorm = require("typeorm");

const app = express();

const datasource = new typeorm.DataSource({
    type: "sqlite",
    database: "./gameLibrarydb.sqlite",
    synchronize: true,
    entities: [require('./entity/Game')],
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

const start = async () => {
    await datasource.initialize();
    await datasource.getRepository('Game').save({name: 'Duke Nukem'})
    app.listen(3000, () => console.log("Server started on 3000"));
}

//Start Server
start();

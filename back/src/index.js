const express = require("express");
const datasource = require("./utils").dataSource;
const gameController = require("./controller/gameController")
const platformController = require("./controller/platformController")

const app = express();

app.use(express.json());

app.post("/game", gameController.create);
app.get("/game", gameController.read);
app.put("/game/:id", gameController.update);
app.delete("/game/:id", gameController.delete);
app.put("/game/:gameId/:platformId", gameController.addPlatform);
app.delete("/game/:gameId/platform/:platformId", gameController.removePlatformFromGame);

app.post("/platform", platformController.create);
app.get("/platform", platformController.read);
app.put("/platform/:id", platformController.update);
app.delete("/platform/:id", platformController.delete);


const start = async () => {
    await datasource.initialize();
    app.listen(3000, () => console.log("Server started on 3000"));
}

start();

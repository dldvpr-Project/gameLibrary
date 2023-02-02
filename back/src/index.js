const express = require("express");
const datasource = require("./utils").datasource;
const gameController = require("./controller/gameController")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/game", gameController.create);
app.post("/api/game", gameController.read)
app.post("/api/game", gameController.update)
app.post("/api/game", gameController.delete)

const start = async () => {
    await datasource.initialize();
    app.listen(3000, () => console.log("Server started on 3000"));
}

//Start Server
start();

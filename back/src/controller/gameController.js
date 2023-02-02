const dataSource = require("../utils").datasource;
const Game = require("../entity/Game");

module.exports = {
    create: (req, res) => {
        dataSource
            .getRepository(Game)
            .save(req.body)
            .then(() => {
                res.status(201).send("Success create a new game");
            })
            .catch(() => {
                res.status(500).send("Error while create a new game");
            });
    },
    read: (req, res) => {
        const games = dataSource
            .getRepository(Game)
            .find()
            .then(() => {
                res.status(200).send(games);
            })
            .catch(() => {
                res.status(500).send("Error while get all games");
            });
    },
    update: (req, res) => {
        dataSource
            .createQueryBuilder()
            .update()
            .set({name})
            .where("id = :id", {id})
            .execute()
            .then(() => {
                res.status(200).send("Success update a game");
            })
            .catch(() => {
                res.status(500).send("Error while update a game");
            });
    },
    delete: (req, res) => {
        dataSource
            .createQueryBuilder()
            .delete()
            .where("id= :id", { id })
            .execute()
            .then(() => {
                res.status(200).send("Success delete a game");
            })
            .catch(() => {
                res.status(500).send("Error while delete a game");
            })
    }
}

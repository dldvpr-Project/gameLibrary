const dataSource = require("../utils").dataSource;
const Game = require("../entity/Game");
const Platform = require("../entity/Platform");
const gameRepository = dataSource.getRepository(Game);
const platformRepository = dataSource.getRepository(Platform);

module.exports = {
    create: async (req, res) => {
        const {name} = req.body;
        try {
            const created = await gameRepository.save({name});
            res.status(201).send(created);
        } catch (err) {
            console.error(err);
            res.status(500).send("error creating game");
        }
    },
    read: async (req, res) => {
        try {
            const games = await gameRepository.find();
            res.status(200).send(games);
        } catch (err) {
            console.error(err);
            res.status(500).send("error reading games");
        }
    },
    update: async (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        try {
            const updated = await gameRepository.update(id, {name});
            res.status(200).send(updated);
        } catch (err) {
            console.error(err);
            res.status(500).send("error updating game");
        }
    },
    delete: async (req, res) => {
        const {id} = req.params;
        try {
            const deleted = await gameRepository.delete(id);
            res.status(200).send(deleted);
        } catch (err) {
            console.error(err);
            res.status(500).send("error deleting game");
        }
    },
    addPlatform: async (req, res) => {

        const gameToUpdate = await gameRepository.findOne({where: {id: req.params.gameId}});

        if (!gameToUpdate) {
            return res.status(404).send("game not found");
        }

        const platformToAdd = await platformRepository.findOne({where: {id: req.params.platformId}});

        if (!platformToAdd) {
            return res.status(404).send("platform not found");
        }

        if (!gameToUpdate.platforms) {
            gameToUpdate.platforms = [];
        }

        gameToUpdate.platforms.push(platformToAdd);
        await gameRepository.save(gameToUpdate);

        return res.send(gameToUpdate);

    },

    removePlatformFromGame: async (req, res) => {

        const gameToUpdate = await gameRepository.findOne({where: {id: req.params.gameId}});

        if (!gameToUpdate) {
            return res.status(404).send("game not found");
        }

        const platformToRemove = await platformRepository.findOne({where: {id: req.params.platformId}});

        if (!platformToRemove) {
            return res.status(404).send("platform not found");
        }

        if (gameToUpdate.platforms && Array.isArray(gameToUpdate.platforms)) {
            gameToUpdate.platforms = gameToUpdate.platforms.filter(platform => platform.id !== platformToRemove.id);
        }

        await gameRepository.save(gameToUpdate);

        res.send("platform deleted from game");
    }

}

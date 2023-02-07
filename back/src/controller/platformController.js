const dataSource = require("../utils").dataSource;
const Platform = require("../entity/Platform");
const platformRepository = dataSource.getRepository(Platform);


module.exports = {
    create: async (req, res) => {
        const {name} = req.body;
        try {
            const created = await platformRepository.save({name});
            res.status(201).send(created);
        } catch (err) {
            console.error(err);
            res.status(500).send("error creating platform");
        }
    },
    read: async (req, res) => {
        try {
            const platforms = await platformRepository.find();
            res.status(200).send(platforms);
        } catch (err) {
            console.error(err);
            res.status(500).send("error reading platforms");
        }
    },
    update: async (req, res) => {
        const  {id}  = req.params;
        const {name} = req.body;
        try {
            const updated = await platformRepository.update(id, {name});
            res.status(200).send(updated);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("error updating platform");
        }
    },
    delete: async (req, res) => {
        const {id} = req.params;
        try {
            const deleted = await platformRepository.delete(id);
            res.status(200).send(deleted);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("error deleting platform");
        }
    }
}
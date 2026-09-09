const Advertisement = require("../models/advertisement");
class AdvertisementController {
    constructor() {
    }
    async GetAll(req, res) {
        try {
            const foundAll = await Advertisement.find().populate("Category").populate("CityArea").populate("Type");
            if (!foundAll) return res.status(404).json({ message: "Advertisements could not found." });
            return res.status(200).json(foundAll);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Create(req, res) {
        try {
            const obj = req.body;
            if (!req.file) {
                return res.status(400).json({ message: "Image upload failed." });
            }
            obj.Image = req.file.filename;
            if (!obj.Name) return res.status(404).json({ message: "Name could not found." });
            const created = await Advertisement.create(obj);
            if (!created) return res.status(404).json({ message: "Advertisement could not created." });
            res.status(201).json(created);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async GetById(req, res) {
        try {
            const id = req.params.id;
            if (!id) return res.status(404).json({ message: "Id could not found." });
            const foundById = await Advertisement.findById(id);
            if (!foundById) return res.status(404).json({ message: "Advertisement could not found." });
            return res.status(200).json(foundById);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Update(req, res) {
        try {
            const obj = req.body;
            if (!req.file) {
                return res.status(400).json({ message: "Image upload failed." });
            }
            obj.Image = req.file.filename;
            const id = req.params.id;
            if (!id) return res.status(404).json({ message: "Id could not found." });
            const updated = await Advertisement.findByIdAndUpdate(id, obj, { new: true });
            if (!updated) return res.status(404).json({ message: "Advertisement could not updated." });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Delete(req, res) {
        try {
            const id = req.params.id;
            if (!id) return res.status(404).json({ message: "Id could not found." });
            const deleted = await Advertisement.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ message: "Advertisement could not deleted." });
            return res.status(200).json(deleted);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}
module.exports = new AdvertisementController();
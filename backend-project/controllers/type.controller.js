const Type = require("../models/type");
class TypeController{
    constructor(){
    }
    async GetAll(req,res){
        try {
            const foundAll = await Type.find();
            if(!foundAll) return res.status(404).json({message:"Types could not found."});
            return res.status(200).json(foundAll);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Create(req,res){
        try {
            const obj = req.body;
            if(!obj.Name) return res.status(404).json({message:"Name could not found."});
            const created = await Type.create(obj);
            if(!created) return res.status(404).json({message:"Type could not created."});
            res.status(201).json(created);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async GetById(req,res){
        try {
            const id = req.params.id;
            if(!id) return res.status(404).json({message:"Id could not found."});
            const foundById = await Type.findById(id);
            if(!foundById) return res.status(404).json({message:"Type could not found."});
            return res.status(200).json(foundById);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Update(req,res){
        try {
            const id = req.params.id;
            if(!id) return res.status(404).json({message:"Id could not found."});
            const updated = await Type.findByIdAndUpdate(id,req.body,{new:true});
            if(!updated) return res.status(404).json({message:"Type could not updated."});
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Delete(req,res){
        try {
            const id = req.params.id;
            if(!id) return res.status(404).json({message:"Id could not found."});
            const deleted = await Type.findByIdAndDelete(id);
            if(!deleted) return res.status(404).json({message:"Type could not deleted."});
            return res.status(200).json(deleted);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
}
module.exports = new TypeController();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
class UserController{
    constructor(){
    }
    async GetAll(req,res){
        try {
            const foundAll = await User.find();
            if(!foundAll) return res.status(404).json({message:"Users could not found."});
            return res.status(200).json(foundAll);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Create(req,res){
        try {
            const obj = req.body;
            if (!req.file) {
                return res.status(400).json({ message: "Image upload failed." });
            }
            obj.Image = req.file.filename;
            if(!obj.Name) return res.status(404).json({message:"Name could not found."});
            const passwordHash = await bcrypt.hash(obj.Password,10);
            obj.Password = passwordHash;
            const created = await User.create(obj);
            if(!created) return res.status(404).json({message:"User could not created."});
            res.status(201).json(created);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async GetById(req,res){
        try {
            const id = req.params.id;
            if(!id) return res.status(404).json({message:"Id could not found."});
            const foundById = await User.findById(id);
            if(!foundById) return res.status(404).json({message:"User could not found."});
            return res.status(200).json(foundById);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Update(req,res){
        try {
            const id = req.params.id;
            if(!id) return res.status(404).json({message:"Id could not found."});
            const updated = await User.findByIdAndUpdate(id,req.body,{new:true});
            if(!updated) return res.status(404).json({message:"User could not updated."});
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Delete(req,res){
        try {
            const id = req.params.id;
            if(!id) return res.status(404).json({message:"Id could not found."});
            const deleted = await User.findByIdAndDelete(id);
            if(!deleted) return res.status(404).json({message:"User could not deleted."});
            return res.status(200).json(deleted);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }
    async Login(req,res){
        try {
            const currentUser = await User.findOne({Email:req.body.Email});
            if(currentUser){
                if(await bcrypt.compare(req.body.Password,currentUser.Password)){
                    const key = process.env.JWT_SECRET_KEY
                    const payLord = {_id : currentUser._id}
                    const expiresInSeconds = Number(process.env.JWT_TOKEN_EXPIRES_IN)
                    const token = await jwt.sign(
                        payLord,
                        key,
                        {expiresIn:expiresInSeconds}
                    )
                    res.header(
                        process.env.JWT_TOKEN_HEADER,
                        token
                    )
                    return res.status(200).json({token: token, user :currentUser});
                }
            }
            return res.status(404).json({message:"invalid email or password"});
        } catch (err) {
            console.error(err);
            return res.status(500).json({message:"failed to get customer"})
        }
    }
}
module.exports = new UserController();
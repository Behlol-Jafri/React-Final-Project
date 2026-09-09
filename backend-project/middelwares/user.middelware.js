require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function authentication(req, res, next) {
    try {
        const token = req.header(process.env.JWT_TOKEN_HEADER);
        const tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await User.findById(tokenData._id);
        if(user){
            req.user = user;
            next();
        }
    } catch (err) {
        console.error(err.name);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "authentication failed" })
        }
    }
}
module.exports = {
    authentication
}
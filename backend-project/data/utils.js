const { default: mongoose } = require("mongoose");

require("dotenv").config();
async function ConnectDb(){
    await mongoose.connect(process.env.DBURL)
}
module.exports={
    ConnectDb
}
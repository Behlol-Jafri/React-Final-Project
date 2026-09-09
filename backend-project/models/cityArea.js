const { default: mongoose, SchemaTypes } = require("mongoose");

const CityAreaSchema = new mongoose.Schema({
    "Name":{
        type : SchemaTypes.String,
        require:true
    }
})

const CityArea = mongoose.model("CityArea",CityAreaSchema);
module.exports = CityArea;
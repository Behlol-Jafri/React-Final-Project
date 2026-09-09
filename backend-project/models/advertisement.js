const { default: mongoose, SchemaTypes } = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
    "Name":{
        type : SchemaTypes.String,
        require:true
    },
    "Price":{
        type : SchemaTypes.String,
        require:true
    },
    "Description":{
        type : SchemaTypes.String,
        require:true
    },
    "Features":{
        type : SchemaTypes.String,
        require:true
    },
    "StartsOn":{
        type : SchemaTypes.Date,
        require:true
    },
    "EndsOn":{
        type : SchemaTypes.Date,
        require:true
    },
    "Category":{
        type : SchemaTypes.ObjectId,
        ref : "Category"
    },
    "CityArea":{
        type : SchemaTypes.ObjectId,
        ref : "CityArea"
    },
    "Type":{
        type : SchemaTypes.ObjectId,
        ref : "Type"
    },
    "PostedBy":{
        type : SchemaTypes.ObjectId,
        ref : "User"
    },
    "Image":{
        type : SchemaTypes.String,
        require:true
    }
})

const Advertisement = mongoose.model("Advertisement",AdvertisementSchema);
module.exports= Advertisement;
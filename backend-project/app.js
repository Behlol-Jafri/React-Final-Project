require("dotenv").config();
const express = require("express");
const {ConnectDb} = require("./data/utils");
const cors = require("cors")

const Port = process.env.PORT;
const Host = process.env.HOST;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const CategoryRouter = require("./routes/category.router");
const CityAreaRouter = require("./routes/cityArea.router");
const TypeRouter = require("./routes/type.router");
const UserRouter = require("./routes/user.router");
const AdvertisementRouter = require("./routes/advertisement.router");
app.use(cors());
app.use("/category",CategoryRouter);
app.use("/cityArea",CityAreaRouter);
app.use("/type",TypeRouter);
app.use("/user",UserRouter);
app.use("/advertisement",AdvertisementRouter);
app.use('/uploads', express.static('uploads'));

app.listen(Port,Host,()=>{
    ConnectDb().then(res => {
        console.log("Db Connected Successfully");
        console.log(`Server is runing on http://${Host}:${Port}`);
    })
})
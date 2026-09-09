const AdvertisementController = require("../controllers/advertisement.controller");
const {Router} = require("express");
const multer = require("multer");
const path = require("path")
const AdvertisementRouter = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
  
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage }); 

AdvertisementRouter.get("/",AdvertisementController.GetAll);
AdvertisementRouter.post("/",upload.single('Image'),AdvertisementController.Create);
AdvertisementRouter.get("/:id",AdvertisementController.GetById);
AdvertisementRouter.put("/:id",upload.single('Image'),AdvertisementController.Update);
AdvertisementRouter.delete("/:id",AdvertisementController.Delete);


module.exports = AdvertisementRouter;
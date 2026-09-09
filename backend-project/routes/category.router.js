const CategoryController = require("../controllers/category.controller");
const {Router} = require("express");
const CategoryRouter = Router();
const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
  
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage }); 

CategoryRouter.get("/",CategoryController.GetAll);
CategoryRouter.post("/",upload.single('Image'),CategoryController.Create);
CategoryRouter.get("/:id",CategoryController.GetById);
CategoryRouter.put("/:id",CategoryController.Update);
CategoryRouter.delete("/:id",CategoryController.Delete);


module.exports = CategoryRouter;
const UserController = require("../controllers/user.controller");
const {Router} = require("express");
const UserRouter = Router();
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

UserRouter.post("/signup",upload.single('Image'),UserController.Create);
UserRouter.post("/login",UserController.Login);

UserRouter.get("/",UserController.GetAll);
UserRouter.post("/",upload.single('Image'),UserController.Create);
UserRouter.get("/:id",UserController.GetById);
UserRouter.put("/:id",UserController.Update);
UserRouter.delete("/:id",UserController.Delete);


module.exports = UserRouter;
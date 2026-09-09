const TypeController = require("../controllers/type.controller");
const {Router} = require("express");
const TypeRouter = Router();

TypeRouter.get("/",TypeController.GetAll);
TypeRouter.post("/",TypeController.Create);
TypeRouter.get("/:id",TypeController.GetById);
TypeRouter.put("/:id",TypeController.Update);
TypeRouter.delete("/:id",TypeController.Delete);


module.exports = TypeRouter;
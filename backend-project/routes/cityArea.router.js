const CityAreaController = require("../controllers/cityArea.controller");
const {Router} = require("express");
const CityAreaRouter = Router();

CityAreaRouter.get("/",CityAreaController.GetAll);
CityAreaRouter.post("/",CityAreaController.Create);
CityAreaRouter.get("/:id",CityAreaController.GetById);
CityAreaRouter.put("/:id",CityAreaController.Update);
CityAreaRouter.delete("/:id",CityAreaController.Delete);


module.exports = CityAreaRouter;
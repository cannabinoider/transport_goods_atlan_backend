import { Router } from "express";
import admincontroller from "../controllers/admincontroller";

const router =  Router();

router.post('/login',admincontroller.login);
router.post('/insertVehicle',admincontroller.insertVehicleController);
router.get('/getVehicles',admincontroller.getAllVehicles);
router.post('/updateVehicles',admincontroller.updateVehicleController);

export default router;
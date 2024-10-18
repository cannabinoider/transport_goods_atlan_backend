import { Router } from "express";
import admincontroller from "../controllers/admincontroller";

const router = Router();

router.post("/login", admincontroller.login);
router.post("/insertVehicle", admincontroller.insertVehicleController);
router.get("/getVehicles", admincontroller.getAllVehicles);
router.post("/updateVehicles", admincontroller.updateVehicleController);
router.get("/get-driver-locations", admincontroller.getDriverLocations);
router.get("/get-all-bookings", admincontroller.getAllBookings);

export default router;

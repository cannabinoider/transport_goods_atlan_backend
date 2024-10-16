import { Router } from "express";
import drivercontroller from "../controllers/drivercontroller";

const router = Router();

router.post("/signup", drivercontroller.signup);
router.post("/login", drivercontroller.login);

router.get("/jobs", drivercontroller.getJobs);
router.post("/accept-jobs", drivercontroller.acceptJob);
router.get("/selected-booking", drivercontroller.getSelectedBooking);
router.post("/current-location", drivercontroller.pushCurrentLocation);
router.post("/status", drivercontroller.updateStatus);

export default router;

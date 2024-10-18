import { Router } from "express";
import usercontroller from "../controllers/usercontroller";

const router = Router();

router.post("/signup", usercontroller.signup);
router.post("/login", usercontroller.login);

router.post("/booking", usercontroller.createBooking);
router.get("/booking-status", usercontroller.bookingStatus);

export default router;

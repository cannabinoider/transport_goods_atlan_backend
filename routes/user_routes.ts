import { Router } from "express";
import usercontroller from "../controllers/usercontroller";

const router = Router();

router.post("/signup", usercontroller.login);
router.post("/login", usercontroller.signup);

router.post("/booking", usercontroller.createBooking);

export default router;

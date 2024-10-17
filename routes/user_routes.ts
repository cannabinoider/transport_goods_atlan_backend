import { Router } from "express";
import usercontroller from "../controllers/usercontroller";

const router = Router();

router.post("/signup", usercontroller.signup);
router.post("/login", usercontroller.login);

router.post("/booking", usercontroller.createBooking);

export default router;

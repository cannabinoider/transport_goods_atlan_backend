import { Router } from "express";
import drivercontroller from "../controllers/drivercontroller";

const router =  Router();

router.post('/signup',drivercontroller.signup);
router.post('/login',drivercontroller.login);

export default router;
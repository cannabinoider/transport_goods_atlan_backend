import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { acceptJobService, createUser, getDriverByUsername, getJobsService, getSelectedBookingService, loginByUsername, pushCurrentLocationService, updateStatusService } from "../services/driverservice";

export const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, phone } = req.body;

    try {
        const { existingUser, message } = await getDriverByUsername(username);

        if (existingUser) {
            res.status(400).send({ message });
            return;
        }
        const { user, token } = await createUser(username, email, password, phone);
        res.status(201).send({ message: "User created successfully", user, token });
    } catch (error) {
        console.error("Error in signup: ", error);
        res.status(500).send({ message: "Internal server error in creating user" });
    }
});

const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    console.log("data", req.body);
    
    try {
        const { token, driver } = await loginByUsername(username, password);
        res.status(201).send({ 
            message: "Login successful", 
            token, 
            driver 
        });
    } catch (err: any) {
        if (err.message === "user not found") {
            res.status(404).send({ message: "User not found" });
        } else if (err.message === "Incorrect password") {
            res.status(401).send({ message: "Invalid Password" });
        } else if (err.message === "role mismatched") {
            res.status(402).send({ message: "Role mismatched" });
        } else {
            res.status(500).send({ message: "Internal server error" });
        }
    }
});


const getJobs = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs = await getJobsService();
        res.status(201).send({ message: "login successfull", jobs });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});

const acceptJob = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const bookingId = req.body.bookingId;
    const driverId = req.body.driverId;
    try {
        const jobs = await acceptJobService(bookingId, driverId);
        res.status(201).send({ message: "accepted job", jobs });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});

const getSelectedBooking = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const driverId = parseInt(req.query.driverId as string);
    try {
        const jobs = await getSelectedBookingService(driverId);
        res.status(201).send({ message: "selected job:", jobs });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});

const pushCurrentLocation = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { bookingId, latitude, longitude } = req.body;

    try {
        const jobs = await pushCurrentLocationService(bookingId, latitude, longitude);
        res.status(201).send({ message: "login successfull", jobs });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});
const updateStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { bookingId, status } = req.body;

    try {
        const jobs = await updateStatusService(bookingId, status);
        res.status(201).send({ message: "status updated", jobs });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});

export default { signup, login, getJobs, acceptJob, getSelectedBooking, pushCurrentLocation, updateStatus };

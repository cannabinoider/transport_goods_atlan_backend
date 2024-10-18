import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createBookingService, createUser, getBookingsWithStatus, getUserByUsername, loginByUsername } from "../services/userservice";

const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, phone } = req.body;

    try {
        const { existingUser, message } = await getUserByUsername(username);

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

    try {
        const { token, user } = await loginByUsername(username, password);
        res.status(200).send({
            message: "Login successful",
            token,
            user,
        });
    } catch (err: any) {
        if (err.message === "User not found") {
            res.status(404).send({ message: "User not found" });
        } else if (err.message === "User role not matched") {
            res.status(402).send({ message: "Role mismatched" });
        } else if (err.message === "Incorrect password") {
            res.status(401).send({ message: "Invalid password" });
        } else {
            res.status(500).send({ message: "Internal server error" });
        }
    }
});

const createBooking = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { good_weight, good_type, vehicle_type, pickup_location_address, pickup_geolocation, dropoff_geolocation, dropoff_location_address, payment_status, graphhopper_response, userId } = req.body;
    try {
        await createBookingService(good_weight, good_type, userId, vehicle_type, pickup_location_address, pickup_geolocation, dropoff_geolocation, dropoff_location_address, payment_status, graphhopper_response);
        res.status(200).send({ message: "booking created successfully" });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});

const bookingStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = parseInt(req.query.userId as string);
        const bookings = await getBookingsWithStatus(userId);
        res.status(200).send({ message: "successfull fetch", bookings });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error" });
    }
});

export default { login, signup, createBooking, bookingStatus };

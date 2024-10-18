import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { loginByUsername, insertVehicle, fetchAllVehicles, updateVehicles, fetchDriverLocationsService, getAllBookingsService } from "../services/adminservice";

const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    console.log("data", req.body);
    try {
        const token = await loginByUsername(username, password);
        res.status(201).send({ message: "login successfull", token });
    } catch (err: any) {
        if (err.message === "user not found") {
            res.status(404).send({ message: "User not found" });
        } else if (err.message === "Incorrect password") {
            res.status(401).send({ message: "Invalid Password" });
        } else if (err.message === "role mismatched") {
            res.status(402).send({ message: "role mismatched " });
        } else {
            res.status(500).send({ message: "Internal server error" });
        }
    }
});
const insertVehicleController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, vehicle_type, vehicle_status, name } = req.body;

    try {
        const newVehicle = await insertVehicle(token, vehicle_type, name, vehicle_status);
        res.status(201).send({ message: "Vehicle inserted successfully", vehicle: newVehicle });
    } catch (err: any) {
        if (err.message === "Invalid token") {
            res.status(401).send({ message: "Invalid token" });
        } else if (err.message === "Access denied") {
            res.status(403).send({ message: "Access denied" });
        }
        res.status(500).send({ message: "Internal server error", error: err.message });
    }
});
const getAllVehicles = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const vehicles = await fetchAllVehicles();
        res.status(200).json({ message: "Vehicles retrieved successfully", vehicles });
    } catch (err: any) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});
const updateVehicleController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, vehicle_type, name, vehicle_status, vehicle_id } = req.body;

    try {
        const vehicles = await updateVehicles(token, vehicle_type, name, vehicle_status, vehicle_id);
        res.status(200).send({ message: "Vehicle updated successfully", vehicle: vehicles });
    } catch (err: any) {
        if (err.message === "Invalid token") {
            res.status(401).send({ message: "Invalid token" });
        } else if (err.message === "Access denied") {
            res.status(403).send({ message: "Access denied" });
        } else if (err.message === "Vehicle not found") {
            res.status(404).send({ message: "Vehicle not found" });
        }
        res.status(500).send({ message: "Internal server error", error: err.message });
    }
});

const getDriverLocations = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, vehicle_type, name, vehicle_status, vehicle_id } = req.body;

    try {
        const vehicles = await fetchDriverLocationsService();
        res.status(200).send({ message: "Driver locations updated successfully", vehicle: vehicles });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error", error: err.message });
    }
});

const getAllBookings = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, vehicle_type, name, vehicle_status, vehicle_id } = req.body;

    try {
        const vehicles = await getAllBookingsService();
        res.status(200).send({ message: "all bookings fetched successfully", vehicle: vehicles });
    } catch (err: any) {
        res.status(500).send({ message: "Internal server error", error: err.message });
    }
});

export default { login, insertVehicleController, getAllVehicles, updateVehicleController, getDriverLocations, getAllBookings };

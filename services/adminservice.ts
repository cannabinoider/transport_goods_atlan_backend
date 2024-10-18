import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { fetchAllBookings, fetchDriverLocations, fetchUserByUsername, get_all_vehicles, insert_vehicle, update_vehicle } from "../models/adminmodel";

const JWT_SECRET = process.env.JWT_SECRET || "chotahathi";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

export async function loginByUsername(username: string, password: string): Promise<any> {
    try {
        const userResult = await fetchUserByUsername(username);
        const user = userResult.rows[0];

        if (!user) {
            throw new Error("User not found");
        }
        if (user.role !== "admin") {
            throw new Error("role mismatched");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const token = jwt.sign({ userId: user.userid, role: user.role, userName: user.username, userEmail: user.email, userPhone: user.phone }, JWT_SECRET, {
            expiresIn: "1h",
        });

        return { token };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function insertVehicle(token: string, vehicle_type: string, name: string, vehicle_status: string): Promise<any> {
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== "admin") {
            throw new Error("Access denied");
        }

        const result = await insert_vehicle(vehicle_type, name, vehicle_status);
        return result.rows[0];
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        }
        throw new Error(error.message);
    }
}
export async function fetchAllVehicles(): Promise<any> {
    try {
        const result = await get_all_vehicles();
        return result.rows;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateVehicles(token: string, vehicle_type: string, name: string, vehicle_status: string, vehicle_id: number): Promise<any> {
    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== "admin") {
            throw new Error("Access denied");
        }

        const result = await update_vehicle(vehicle_type, name, vehicle_status, vehicle_id);

        if (result.rowCount === 0) {
            throw new Error("Vehicle not found");
        }

        return result.rows[0];
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        } else if (error.message === "Access denied") {
            throw new Error("Access denied");
        }
        throw new Error(error.message);
    }
}

export async function fetchDriverLocationsService(): Promise<any> {
    try {
        const result = await fetchDriverLocations();
        return result.rows;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
export async function getAllBookingsService(): Promise<any> {
    try {
        const result = await fetchAllBookings();
        return result.rows;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

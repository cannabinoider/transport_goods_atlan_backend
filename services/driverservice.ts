import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { insert_driver, fetchDriverByUsername, fetchJobs, acceptJob, fetchSelectedBooking, postCurrentLocation, updateStatus } from "../models/drivermodel";
const JWT_SECRET = process.env.JWT_SECRET || "chotahathi";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

export async function createUser(username: string, email: string, password: string, phone: string): Promise<{ user: any; token: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await insert_driver(username, email, hashedPassword, phone);
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
}

export async function getDriverByUsername(username: string): Promise<{ existingUser: boolean; message: string }> {
    try {
        const result = await fetchDriverByUsername(username);
        if (result.rows.length > 0) {
            return { existingUser: true, message: "Username already exists!" };
        }
        return { existingUser: false, message: "" };
    } catch (error) {
        throw new Error("Error fetching user by username");
    }
}

export async function loginByUsername(username: string, password: string): Promise<any> {
    try {
        const userResult = await fetchDriverByUsername(username);
        const user = userResult.rows[0];
        if (!user) {
            throw new Error("user not found");
        }
        if (user.role !== "driver") {
            throw new Error("role mismatched");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }
        const token = jwt.sign({ userId: user.user_id, role: user.role, userName: user.username, userEmail: user.email, userPhone: user.phone }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return { 
            token, 
            driver: {
                userId: user.user_id,
                userName: user.username,
                userEmail: user.email,
                userPhone: user.phone
            } 
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getJobsService(): Promise<any> {
    try {
        const jobs = await fetchJobs();
        return jobs;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function acceptJobService(bookingId: number, driverId: number): Promise<void> {
    try {
        await acceptJob(bookingId, driverId);
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function getSelectedBookingService(driverId: number): Promise<any> {
    try {
        const selectedBookings = await fetchSelectedBooking(driverId);
        return selectedBookings;
        // console.log("u :", selectedBookings);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function pushCurrentLocationService(bookingId: number, latitude: string, longitude: string): Promise<void> {
    try {
        await postCurrentLocation(bookingId, latitude, longitude);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateStatusService(bookingId: number, status: string): Promise<void> {
    try {
        await updateStatus(bookingId, status);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

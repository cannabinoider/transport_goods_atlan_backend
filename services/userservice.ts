import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { insert_user, fetchUserByUsername, insertBooking } from "../models/usermodel";

const JWT_SECRET = process.env.JWT_SECRET || "chotahathi";

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

export async function createUser(username: string, email: string, password: string, phone: string): Promise<{ user: any; token: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await insert_user(username, email, hashedPassword, phone);
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
}

export async function getUserByUsername(username: string): Promise<{ existingUser: boolean; message: string }> {
    try {
        const result = await fetchUserByUsername(username);
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
        const userResult = await fetchUserByUsername(username);
        const user = userResult.rows[0];
        if (!user) {
            throw new Error("user not found");
        }
        if (user.role !== "user") {
            throw new Error("User role not matched");
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

export async function createBookingService(good_weight: string, good_type: string, vehicle_type: string, pickup_location_address: string, pickup_geolocation: string, dropoff_geolocation: string, dropoff_location_address: string, payment_status: string, graphhopper_response: string): Promise<void> {
    try {
        const GHRespons = JSON.parse(graphhopper_response);
        await insertBooking(good_weight, good_type, vehicle_type, pickup_location_address, pickup_geolocation, dropoff_geolocation, dropoff_location_address, payment_status, GHRespons);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

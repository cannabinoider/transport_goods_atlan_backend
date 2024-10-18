import { error } from "console";
import pool from "../db";
import { INSERT_USER, GET_USER_BY_USERNAME, INSERT_BOOKING, FETCH_BOOKINGS_WITH_STATUS } from "./query";
import { QueryResult } from "pg";

export function insert_user(username: string, email: string, hashedPassword: string, phone: string): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(INSERT_USER, [username, email, hashedPassword, phone, "user"], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
export function fetchUserByUsername(username: string): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(GET_USER_BY_USERNAME, [username], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export function insertBooking(good_weight: string, good_type: string, userId: number, vehicle_type: string, pickup_location_address: string, pickup_geolocation: string, dropoff_geolocation: string, dropoff_location_address: string, payment_status: string, GHResponse: any): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(INSERT_BOOKING, [good_weight, good_type, vehicle_type, pickup_location_address, pickup_geolocation, dropoff_geolocation, dropoff_location_address, payment_status, GHResponse, userId], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export function getBookingWithStatus(userId: number): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(FETCH_BOOKINGS_WITH_STATUS, [userId], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

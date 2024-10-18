import { QueryResult } from "pg";
import pool from "../db";
import { INSERT_USER, GET_USER_BY_USERNAME, GET_ALL_JOBS, FETCH_VEHICLE_ID, ACCEPT_JOB, SELECTED_BOOKING, CURRENT_LOCATION, UPDATE_STATUS } from "./query";

export function insert_driver(username: string, email: string, hashedPassword: string, phone: string): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(INSERT_USER, [username, email, hashedPassword, phone, "driver"], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export function fetchDriverByUsername(username: string): Promise<QueryResult<any>> {
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

export function fetchJobs(): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(GET_ALL_JOBS, [], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
export async function acceptJob(bookingId: number, driverId: number): Promise<QueryResult<any>> {
    const vehicle = await pool.query(FETCH_VEHICLE_ID, [bookingId]);

    console.log(vehicle);
    const vehicleId = vehicle.rows[0].vehicle_id;

    return new Promise((resolve, reject) => {
        pool.query(ACCEPT_JOB, [bookingId, vehicleId, driverId], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export async function fetchSelectedBooking(driverId: number): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(SELECTED_BOOKING, [driverId], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                // console.log("1 ",results.rows);
                resolve(results.rows);
            }
        });
    });
}

export async function postCurrentLocation(bookingId: number, latitude: string, longitude: string): Promise<QueryResult<any>> {
    const timestamp = new Date().toISOString();

    return new Promise((resolve, reject) => {
        pool.query(CURRENT_LOCATION, [bookingId, latitude, longitude, timestamp], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export async function updateStatus(bookingId: number, status: string): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(UPDATE_STATUS, [bookingId, status], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

import { error } from "console";
import pool from "../db";
import { FETCH_ALL_BOOKINGS, FETCH_LOCATIONS, GET_USER_BY_USERNAME, GET_VEHICLES, INSERT_VEHICLE, UPDATE_VEHICLE } from "./query";
import { QueryResult } from "pg";

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

export function insert_vehicle(vehicle_type: string, name: string, vehicle_status: string): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(INSERT_VEHICLE, [vehicle_type, name, vehicle_status], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
export function get_all_vehicles(): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(GET_VEHICLES, [], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
export function update_vehicle(vehicle_type: string, name: string, vehicle_status: string, vehicle_id: number): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(UPDATE_VEHICLE, [vehicle_type, name, vehicle_status, vehicle_id], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export function fetchDriverLocations(): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(FETCH_LOCATIONS, [], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export function fetchAllBookings(): Promise<QueryResult<any>> {
    return new Promise((resolve, reject) => {
        pool.query(FETCH_ALL_BOOKINGS, [], (error: any, results: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

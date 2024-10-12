import { QueryResult } from "pg";
import pool from "../db"; 
import { INSERT_USER, GET_USER_BY_USERNAME } from "./query";

export function insert_driver(
    username: string,
    email: string,
    hashedPassword: string,
    phone: string
): Promise <QueryResult<any>> {
    return new Promise((resolve, reject)=>{
        pool.query(
            INSERT_USER,
            [username,email,hashedPassword,phone,'driver'],
            (error:any, results:any)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(results);
                }
            }
        );
    });
}

export function fetchDriverByUsername(username:string) :
    Promise <QueryResult<any>>{
        return new Promise((resolve, reject) => {
        pool.query(
            GET_USER_BY_USERNAME, [username],
            (error:any, results:any)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(results);
                }
            }
        );
    });
}
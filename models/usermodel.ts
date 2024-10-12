import { error } from "console";
import pool from "../db";
import { INSERT_USER, GET_USER_BY_USERNAME} from "./query";
import { QueryResult } from "pg";

export function insert_user(
    username: string,
    email: string,
    hashedPassword: string,
    phone: string
): Promise <QueryResult<any>> {
    return new Promise((resolve, reject)=>{
        pool.query(
            INSERT_USER,
            [username,email,hashedPassword,phone,'user'],
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
export function fetchUserByUsername(username:string) :
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

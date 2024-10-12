import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { insert_user, fetchUserByUsername } from "../models/usermodel";

export async function createUser(
    username: string,
    email: string,
    password: string,
    phone: string
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insert_user(username, email, hashedPassword, phone);
    return result.rows[0];
}

export async function getUserByUsername(username: string): Promise<{ existingUser: boolean; message: string }> {
    try {
        const result = await fetchUserByUsername(username);
        if (result.rows.length > 0) {
            return { existingUser: true, message: 'Username already exists!' };
        }
        return { existingUser: false, message: '' };
    } catch (error) {
        throw new Error("Error fetching user by username");
    }
}

export async function loginByUsername(username:string, password:string): Promise<any>{
    try{
        const userResult = await fetchUserByUsername(username);
        const user = userResult.rows[0];
        if(!user){
            throw new Error("user not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("Incorrect password");
        }
        return user;
    }
    catch(error:any){
        throw new Error (error.message);
    }
}
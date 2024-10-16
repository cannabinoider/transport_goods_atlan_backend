import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; 
import {
  createUser,
  getUserByUsername,
  loginByUsername,
} from "../services/userservice";

export const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone } = req.body;

  try {
    const { existingUser, message } = await getUserByUsername(username);

    if (existingUser) {
      res.status(400).send({ message });
      return;
    }
    const { user, token } = await createUser(username, email, password, phone);
    res.status(201).send({ message: 'User created successfully', user, token });

  } catch (error) {
    console.error("Error in signup: ", error);
    res.status(500).send({ message: "Internal server error in creating user" });
  }
});

export const login = asyncHandler(async(req: Request, res: Response): Promise<void>=>{
    const {username, password} = req.body;
    console.log("data" , res);
    try{
        const token = await loginByUsername(username, password);
        res.status(200).send({message: 'login successfull', token})
    }catch(err:any){
        if(err.message === 'user not found'){
            res.status(404).send({message: "User not found"})
        }
        else if(err.message === 'User role not matched'){
          res.status(402).send({message: "Role mismatched"})
      }
        else if (err.message === 'Incorrect password'){
            res.status(401).send({message: 'Invalid Password'})
        }
        else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
})


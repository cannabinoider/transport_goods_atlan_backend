import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; 
import {
  createUser,
  getDriverByUsername,
  loginByUsername,
} from "../services/driverservice";

export const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone } = req.body;

  try {
    const { existingUser, message } = await getDriverByUsername(username);

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

const login = asyncHandler(async(req: Request, res: Response): Promise<void>=>{
    const {username, password} = req.body;
    console.log("data" , req.body);
    try{
        const token = await loginByUsername(username, password);
        res.status(201).send({message: 'login successfull', token})
    }catch(err:any){
        if(err.message === 'user not found'){
            res.status(404).send({message: "User not found"})
        }
        else if (err.message === 'Incorrect password'){
            res.status(401).send({message: 'Invalid Password'})
        }
        else if(err.message === 'User role not matched'){
          res.status(402).send({message: "Role mismatched"})
      }
        else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
})

export default { signup, login };

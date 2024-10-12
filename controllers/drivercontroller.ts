import { Request, Response } from "express";
import asyncHandler from "express-async-handler"; 
import {
  createUser,
  getDriverByUsername,
  loginByUsername,
} from "../services/driverservice";

const signup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, phone } = req.body; 

  console.log("Registration data: ", req.body);

  try {
    const { existingUser, message } = await getDriverByUsername(username);

    if (existingUser) {
      res.status(400).send({ message }); 
      return; 
    }

    const newUser = await createUser(username, email, password, phone); 
    res.status(201).send({ message: 'User created successfully', user: newUser });
    
  } catch (error) {
    console.error("Error in signup: ", error);
    res.status(500).send({ message: "Internal server error in creating user" });
  }
});

const login = asyncHandler(async(req: Request, res: Response): Promise<void>=>{
    const {username, password} = req.body;
    console.log("data" , req.body);
    try{
        const user = await loginByUsername(username, password);
        res.status(201).send({message: 'login successfull', user})
    }catch(err:any){
        if(err.message === 'user not found'){
            res.status(404).send({message: "User not found"})
        }
        else if (err.message === 'Incorrect password'){
            res.status(401).send({message: 'Invalid Password'})
        }
        else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
})

export default { signup, login };

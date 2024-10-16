// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "chotahathi"; 

// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization']?.split(' ')[1]; 

//   if (!token) {
//     return res.sendStatus(401); 
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }

//     req.user = user; 
//     next();
//   });
// };

// export default authenticateToken;

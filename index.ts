import  express  from "express";
import cors from "cors";
import { Request, Response } from "express";
import pool from "./db";
import user_routes from "./routes/user_routes"
import driver_routes from "./routes/driver_routes"


const app = express()
const port = 8000

app.use(express.json());
app.use(cors());

app.use('/api/users',user_routes);
app.use('/api/drivers',driver_routes);

app.get('/',(req:Request, res:Response)=>{
    console.log("first");
    res.send("hello");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


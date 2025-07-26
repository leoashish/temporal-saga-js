import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { runClient } from "../client/temporalClient";
import { Worker, NativeConnection } from "@temporalio/worker";

dotenv.config() // Load variables from dotenv to process.env
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.get("/", (req: Request, res: Response)=>{
    runClient().catch(err=>{
    console.error(err)
    process.exit(1)
}).then(() => {
    res.send("Workflow started successfully!");
})
});
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})

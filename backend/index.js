const express=require("express");
const cors=require("cors");
require("dotenv").config();
const database=require("../backend/Db/Db");
const event_route=require("../backend/router/Event_router")
const app=express();

app.use(cors());
app.use(express.json());
database();
app.use("/api",event_route)

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running at  http://localhost:${port}`);
})
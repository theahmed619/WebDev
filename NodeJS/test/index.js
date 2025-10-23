import express from "express"
import dotenv from "dotenv"

const app=express()
dotenv.config()

// middleware
app.use(express.json());

const port=process.env.PORT || 4000


app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})


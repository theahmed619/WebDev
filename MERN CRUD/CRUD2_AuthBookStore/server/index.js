const express=require("express");
const databaseConnection=require("./database");
const bookRouter=require("./routes/book.routes")
const cors =require("cors");
const userRouter =require("./routes/user.routes")
const authMiddleWare=require("./middleware/auth.middleware")

// database connection
databaseConnection();

const app=express();

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
res.send("Hellow Wolrd")
})

app.use('/book',authMiddleWare,bookRouter);
app.use("/user",userRouter);

app.listen(8000,()=>{
  console.log(`port listening 8000`)
})
const express = require("express");
const connection = require("./db");
const { userRouter } = require("./routes/userRouter");
const { notesRouter } = require("./routes/notesRouter");
const cors=require("cors")

const app = express();


app.use(express.json());
app.use(cors())


app.use("/user", userRouter);
app.use("/notes",notesRouter)
// app.use("/",(req,res)=>{
//     res.send("home page")
// })

app.listen(8008, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("server running at 8000");
  } catch (err) {
    console.log(err);
  }
});

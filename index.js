const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

const { connection } = require("./db/db");
const { userRouter } = require("./controllers/user.routes");
const {authenticate} = require("./middlewares/auth.middleware");
const { userDataRouter } = require("./controllers/userData.routes");
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/userData",authenticate, userDataRouter);
// app.use("/userData",userDataRouter);
const port = process.env.port || 7000;

app.get("/", (req, res) => {
  res.send({message:"HOME PAGE"});
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`server is running at port ${port}`);
  } catch (error) {
    console.log(error);
  }
});

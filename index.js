require("dotenv").config();

const cookieParser = require("cookie-parser");

const http = require("http");

const cors = require("cors");

const path = require("path");

const express = require("express");

const userRouter = require("./routes/user")

const mongoose = require("mongoose");

const { Server } = require("socket.io");
const checkForAuthenticationCookie = require("./middleware/auth");
const PORT = process.env.PORT || 5000;

const app = express();
app.set("view engine" , "ejs");
app.set("views" , path.join("views"));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }))
app.use(checkForAuthenticationCookie("token"));
app.use("/user" , userRouter);

app.get("/", (req, res) => {
  return res.render("index");
});
const server = http.createServer(app);
// socket.io
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connected"));
server.listen(PORT, () => console.log(`server started at port ${PORT}`));

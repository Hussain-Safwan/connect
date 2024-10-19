const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./staticController");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const { sendMessage, addThread, addGroup } = require("./dynamicController");

app = express();

const uri =
  "mongodb+srv://safwandu16:home761049@connect-cluster-01.87zba.mongodb.net/?retryWrites=true&w=majority&appName=connect-cluster-01";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.options("*", cors());
app.use(bodyParser.json());

// deployment test
app.get("/hello", (req, res) =>
  res.status(200).json({ message: "hello, the deployment was successful!" })
);

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });
server.listen(port, () =>
  console.log(`Realtime server is running at port: ${port}`)
);

io.on("connection", (socket) => {
  socket.on("message", async (req) => {
    const res = await sendMessage(req);
    io.emit("message", res);
  });

  socket.on("add-thread", async (req) => {
    const res = await addThread(req);
    io.emit("add-thread", res);
  });

  socket.on("add-group", async (req) => {
    const res = await addGroup(req);
    console.log(res);
    io.emit("add-group", res);
  });
});

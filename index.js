const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const { sendMessage } = require("./messageController");

app = express();
const server = http.Server(app);
const io = socket(server, { cors: { origin: "*" } });

const uri =
  "mongodb+srv://safwandu16:home761049@connect-cluster-01.87zba.mongodb.net/?retryWrites=true&w=majority&appName=connect-cluster-01";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected"));

app.use(cors());
app.use(bodyParser.json());

// deployment test
app.get("/hello", (req, res) =>
  res.status(200).json({ message: "hello, the deployment successful!" })
);

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server is running at port: ${port}`));

io.on("connection", (socket) => {
  socket.on("message", async (message) => {
    const thread = await sendMessage(message);
    io.emit("message", thread);
  });
});

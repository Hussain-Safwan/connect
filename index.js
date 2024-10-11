const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

app = express();

const uri =
  "mongodb+srv://safwandu16:home761049@connect-cluster-01.87zba.mongodb.net/?retryWrites=true&w=majority&appName=connect-cluster-01";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api/", routes);

const port = 4000;
app.listen(port, () => console.log(`Server is running at port: ${port}`));

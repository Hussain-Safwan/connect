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

app.use(cors());
app.use(bodyParser.json());

// deployment test
app.get("/", (req, res) =>
  res.status(200).json({ message: "deployment successful!" })
);
app.use("/api/", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running at port: ${port}`));

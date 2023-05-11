const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const api = require("./api");

app.get("/", function (req, res) {
  res.json({
    message: "Main GET call",
  });
});

app.use(express.json());
app.use(cors());
app.use("/api", api);

mongoose
  .connect(
    "mongodb+srv://admin:Tech2211@jctechapi.doctlfi.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to mongodb");

    app.listen(4000, function () {
      console.log("listening to port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

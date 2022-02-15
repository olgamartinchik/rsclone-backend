const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require('http');
const fileupload = require("express-fileupload");

const app = express();
const authMiddleware = require('../middleware/auth.middleware')

app.get('/',(req:any,res:any)=>{
res.send("Hello, World!")
})

app.use(require("morgan")("dev"));

export const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(fileupload());
app.use(express.json({ extended: true }));
app.use(express.static('../static/'));

//initialize routs
// app.use("/api",authMiddleware, require("../routes/avatar.routes"));
app.use("/api", require("../routes/avatar.routes"));
app.use("/api/auth", require("../routes/auth.routes"));
app.use("/api/userSettings", require("../routes/userSettings.routs"));
app.use("/api/workouts", require("../routes/workouts.routs"));
app.use("/api/workoutSettings", require("../routes/workoutSettings.routs"));

const PORT = process.env.PORT || config.get("port");

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT || 5000, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();

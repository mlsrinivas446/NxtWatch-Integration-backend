const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config()
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const router = require("./routes/index")

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" , methods: "GET,HEAD,PUT,PATCH,POST,DELETE", credentials: true,}));

const PORT = 5000;

app.use("/api", router)

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set. Check your .env file.");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connection established");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }
  catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }

}
startServer();
  





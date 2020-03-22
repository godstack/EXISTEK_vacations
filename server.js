const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.json({ extended: true }));

app.use("/api/employee", require("./routes/employee.routes"));

app.use("/api/auth/", require("./routes/auth.routes"));

const PORT = process.env.PORT || config.get("PORT") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("MongoUri"), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();

import express from "express";
import path from "path";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import users from "./routes/users";
import auth from "./routes/auth";
import films from "./routes/films";
import authfilms from "./routes/authfilms";

const app = express();

dotenv.config({
  path: path.join(__dirname, ".env")
});
const isDev = app.get("env") === "development";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/films", films);
app.use("/api/authfilms", authfilms);

const port = process.env.PORT || 4000;
const mongoUrl = `${process.env.DB_CONNECTION}`;

mongodb.MongoClient.connect(mongoUrl, { useNewUrlParser: true })
  .then(client => {
    const db = client.db(process.env.DB_NAME);

    app.set("db", db);

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./index.html"));
    });
    app.get("/api/test", (req, res) => {
      res.json({ mes: "Hello from express" });
    });
    app.listen(port, () => console.log(`Running on localhost:${port}`));
  })
  .catch(err => console.log("Error connect"));

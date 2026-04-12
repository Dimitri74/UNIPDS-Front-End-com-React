import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";

import authRoute from "./routes/auth.route.js";
import tasksRoute from "./routes/tasks.route.js";

import db from "./models/index.js";

dotenv.config();

const port = process.env.APP_PORT || process.env.PORT;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado");
}

if (!port) {
  throw new Error("PORT ou APP_PORT não configurada");
}

let memoryMongoServer;

const connectToDatabase = async () => {
  let mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    memoryMongoServer = await MongoMemoryServer.create();
    mongoUrl = memoryMongoServer.getUri();

    console.log("MONGO_URL não configurada; usando MongoDB em memória");
  }

  await db.mongoose.connect(mongoUrl);
};

const dbConnection = db.mongoose.connection;

dbConnection.on("error", (error) => {
  console.log("Error connecting to database: ", error.message);
});

dbConnection.once("open", () => {
  console.log("connection to db established");
});

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);

app.use("/tasks", tasksRoute);

app.use(function (_req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );

  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.send({
    error: {
      message: err.message,
    },
  });
});

app.get("/", (_req, res) => {
  res.json({ message: "Server active." });
});

const bootstrap = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

bootstrap().catch(async (error) => {
  console.error("Error starting server:", error.message);

  if (memoryMongoServer) {
    await memoryMongoServer.stop();
  }

  process.exit(1);
});

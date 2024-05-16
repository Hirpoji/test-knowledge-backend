import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  testCreateValidation,
} from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/UserController.js";
import {
  createTest,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/TestController.js";
import multer from "multer";
import handleValidationError from "./utils/handleValidationError.js";

const app = express();

const URL =
  "mongodb+srv://fghserf:X4cElIJr33SDVdvt@cluster0.j8rdrxt.mongodb.net/test-knowledge?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.get("/auth/me", checkAuth, getMe);

app.post("/auth/login", loginValidation, handleValidationError, login);

app.post("/auth/register", registerValidation, handleValidationError, register);

app.post("/test", testCreateValidation, createTest);

app.get("/test", getAll);

app.get("/test/:id", getOne);

app.delete("/test/:id", handleValidationError, checkAuth, remove);

app.patch(
  "/test/:id",
  handleValidationError,
  checkAuth,
  testCreateValidation,
  update
);

app.post("/uploads", uploads.single("image"), (req, res) => {
  console.log(1);
  res.json({
    url: `uploads/${req.file.originalname}`,
  });
});

const server = app.listen(4444, (err) => {
  err
    ? console.log(err)
    : console.log("Server started on " + server.address().port);
});

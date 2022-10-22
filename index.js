const mongoose = require("mongoose");
const express = require("express");
const { json } = require("express/lib/response");
const multer = require("multer");

// importing all the CRUD operation functions
const {
  getClient,
  getAllClients,
  createClient,
  deleteClient,
  updateClient,
  searchClients,
} = require("./controllers");
// declaring express server
const app = express();

// fixing cross origin errors
const cors = require("cors");

// DB uri for mongoDB
const url = "mongodb://127.0.0.1:27017/school";

// midleware for parsing resolve json responses
app.use(express.json());

// fixing cross origin errors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// midleware for file upload

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

app.post("/images", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("file upload success");
});

// server port exp : 3000,5000,5500 ... etc
const PORT = 8000;

// routes
app.post("/clients", createClient);
app.get("/clients", getAllClients);
app.get("/clients/:name", searchClients);
app.get("/clients/:id", getClient);
app.delete("/clients/:id", deleteClient);
app.patch("/clients/:id", updateClient);

// Connect to MongoDB and start API
const start = async () => {
  try {
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
      },
      () => {
        console.log(`MongoDB Connected: ${url}`);
      }
    );
    app.listen(PORT, () => {
      console.log("API is listening on port " + PORT);
    });
  } catch (error) {
    console.log("Connection Error", error);
  }
  return 1;
};

start();

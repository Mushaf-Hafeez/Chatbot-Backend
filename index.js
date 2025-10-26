const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

const routes = require("./routes/chat.route");
const ai = require("./config/gemini");

const PORT = process.env.PORT || 3000;

// middlwares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/v1/chat", routes);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running ate http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRouter);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});